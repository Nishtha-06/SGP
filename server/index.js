import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import process from 'node:process';

const app = express();
const port = Number(process.env.PORT || 3001);
const jwtSecret = process.env.JWT_SECRET || 'development-only-change-me';
const groqModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const hasGroqApiKey = Boolean(process.env.GROQ_API_KEY && !process.env.GROQ_API_KEY.includes('your_groq_api_key'));
const roles = ['STUDENT', 'FACULTY', 'CC_FACULTY', 'ADMIN'];

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const uploadsDir = join(process.cwd(), 'uploads');
mkdirSync(uploadsDir, { recursive: true });
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, done) => done(null, uploadsDir),
    filename: (_req, file, done) => done(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`),
  }),
  limits: { fileSize: 10 * 1024 * 1024, files: 3 },
  fileFilter: (_req, file, done) => done(null, /pdf|msword|officedocument|powerpoint/.test(file.mimetype)),
});
app.use('/uploads', express.static(uploadsDir));

// Mock persistence for frontend development. Replace these collections with database repositories later.
const users = [
  { id: 'stu-1', name: 'Saanvi Kulkarni', email: 'student@projectpulse.test', password: 'student123', role: 'STUDENT', department: 'Computer Science' },
  { id: 'stu-2', name: 'Aarav Rao', email: 'student2@projectpulse.test', password: 'student123', role: 'STUDENT', department: 'Computer Science' },
  { id: 'fac-1', name: 'Dr. Maya Shah', email: 'faculty@projectpulse.test', password: 'faculty123', role: 'FACULTY', department: 'Computer Science' },
  { id: 'cc-1', name: 'Dr. Nikhil Mehta', email: 'ccfaculty@projectpulse.test', password: 'ccfaculty123', role: 'CC_FACULTY', department: 'Computer Science' },
  { id: 'admin-1', name: 'System Admin', email: 'admin@projectpulse.test', password: 'admin123', role: 'ADMIN', department: 'Administration' },
];
const groups = [{ id: 'grp-1', name: 'Pixel Pioneers', department: 'Computer Science', leaderId: 'stu-1', memberIds: ['stu-1', 'stu-2'], maxMembers: 4, projectLocked: false, selectedProject: null, createdAt: new Date().toISOString() }];
const submissions = [{ id: 'sub-1', groupId: 'grp-1', department: 'Computer Science', project: { title: 'Smart Campus Navigator', problemStatement: 'Students need accessible, real-time campus navigation.', objective: 'Deliver accessible routes and live crowd insights.', recommendedTechnologies: ['React', 'Python', 'PostgreSQL'], difficultyLevel: 'Medium', expectedOutcomes: ['Accessible routes', 'Live occupancy insights'], estimatedTimeline: '12 weeks' }, status: 'PENDING_REVIEW', documents: [], feedback: [], submittedAt: new Date().toISOString(), reviewedBy: null, detailsLocked: false }];
let aiRules = { prioritizeInterdisciplinaryTeams: true, includeSocialImpactScore: true, allowExternalProblemStatements: false, maxRecommendations: 3, updatedAt: new Date().toISOString() };

const safeUser = ({ password, ...user }) => user;
const findGroup = (id) => groups.find((group) => group.id === id);
const findSubmission = (id) => submissions.find((submission) => submission.id === id);
const userCanManageGroup = (user, group) => user.role === 'ADMIN' || group.leaderId === user.id;

function authenticate(req, res, next) {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Authentication required. Send a Bearer token.' });
  try {
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ error: 'Your session is invalid or expired. Sign in again.' });
  }
}

function allowRoles(...allowedRoles) {
  return (req, res, next) => allowedRoles.includes(req.user.role)
    ? next()
    : res.status(403).json({ error: `This action requires one of: ${allowedRoles.join(', ')}.` });
}

function groupForStudent(userId) { return groups.find((group) => group.memberIds.includes(userId)); }

app.get('/api/health', (_req, res) => res.json({ status: 'ok', provider: 'groq' }));

app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body || {};
  const user = users.find((candidate) => candidate.email.toLowerCase() === String(email || '').toLowerCase());
  if (!user || user.password !== password) return res.status(401).json({ error: 'Invalid email or password.' });
  if (role && user.role !== role) return res.status(403).json({ error: `This account has the ${user.role} role, not ${role}.` });
  const token = jwt.sign({ id: user.id, role: user.role, department: user.department, name: user.name }, jwtSecret, { expiresIn: '8h' });
  return res.json({ token, user: safeUser(user) });
});
app.get('/api/auth/me', authenticate, (req, res) => res.json({ user: req.user }));

app.post('/api/groups', authenticate, allowRoles('STUDENT'), (req, res) => {
  if (groupForStudent(req.user.id)) return res.status(409).json({ error: 'You already belong to a group.' });
  const { name, maxMembers = 4 } = req.body || {};
  if (!name?.trim()) return res.status(400).json({ error: 'Group name is required.' });
  if (!Number.isInteger(Number(maxMembers)) || Number(maxMembers) < 1 || Number(maxMembers) > 6) return res.status(400).json({ error: 'maxMembers must be between 1 and 6.' });
  const group = { id: `grp-${Date.now()}`, name: name.trim(), department: req.user.department, leaderId: req.user.id, memberIds: [req.user.id], maxMembers: Number(maxMembers), projectLocked: false, selectedProject: null, createdAt: new Date().toISOString() };
  groups.push(group);
  return res.status(201).json({ group });
});

app.get('/api/groups/me', authenticate, allowRoles('STUDENT'), (req, res) => {
  const group = groupForStudent(req.user.id);
  if (!group) return res.json({ group: null });
  return res.json({ group: { ...group, members: users.filter((user) => group.memberIds.includes(user.id)).map(safeUser) } });
});

app.post('/api/groups/:groupId/join', authenticate, allowRoles('STUDENT'), (req, res) => {
  const group = findGroup(req.params.groupId);
  if (!group) return res.status(404).json({ error: 'Group not found.' });
  if (group.projectLocked) return res.status(409).json({ error: 'This group is locked and cannot accept members.' });
  if (groupForStudent(req.user.id)) return res.status(409).json({ error: 'Leave your current group before joining another.' });
  if (group.memberIds.length >= group.maxMembers) return res.status(409).json({ error: 'This group is already full.' });
  group.memberIds.push(req.user.id);
  return res.json({ group });
});

app.post('/api/groups/:groupId/select-project', authenticate, allowRoles('STUDENT'), (req, res) => {
  const group = findGroup(req.params.groupId);
  if (!group) return res.status(404).json({ error: 'Group not found.' });
  if (!userCanManageGroup(req.user, group)) return res.status(403).json({ error: 'Only the group leader can select a project.' });
  if (group.projectLocked) return res.status(409).json({ error: 'Project selection is already locked.' });
  if (!req.body?.project?.title) return res.status(400).json({ error: 'A project with a title is required.' });
  group.selectedProject = req.body.project;
  return res.json({ group });
});

app.post('/api/groups/:groupId/lock-selection', authenticate, allowRoles('STUDENT'), (req, res) => {
  const group = findGroup(req.params.groupId);
  if (!group) return res.status(404).json({ error: 'Group not found.' });
  if (!userCanManageGroup(req.user, group)) return res.status(403).json({ error: 'Only the group leader can lock selection.' });
  if (!group.selectedProject?.title) return res.status(400).json({ error: 'Select a project before locking it.' });
  group.projectLocked = true;
  return res.json({ group });
});

app.post('/api/submissions', authenticate, allowRoles('STUDENT'), (req, res) => {
  const group = groupForStudent(req.user.id);
  if (!group) return res.status(400).json({ error: 'Create or join a group before submitting a proposal.' });
  if (!group.projectLocked) return res.status(409).json({ error: 'Lock your group project selection before submitting.' });
  if (submissions.some((submission) => submission.groupId === group.id)) return res.status(409).json({ error: 'This group already has a submitted proposal.' });
  const project = req.body?.project || group.selectedProject;
  if (!project?.title || !project?.problemStatement || !project?.objective) return res.status(400).json({ error: 'Project title, problem statement, and objective are required.' });
  const submission = { id: `sub-${Date.now()}`, groupId: group.id, department: group.department, project, status: 'PENDING_REVIEW', documents: [], feedback: [], submittedAt: new Date().toISOString(), reviewedBy: null, detailsLocked: false };
  submissions.push(submission);
  return res.status(201).json({ submission });
});

app.get('/api/submissions', authenticate, (req, res) => {
  if (req.user.role === 'STUDENT') {
    const group = groupForStudent(req.user.id);
    return res.json({ submissions: group ? submissions.filter((submission) => submission.groupId === group.id) : [] });
  }
  if (req.user.role === 'ADMIN') return res.json({ submissions });
  return res.json({ submissions: submissions.filter((submission) => submission.department === req.user.department) });
});

app.post('/api/submissions/:submissionId/documents', authenticate, allowRoles('STUDENT'), upload.array('documents', 3), (req, res) => {
  const submission = findSubmission(req.params.submissionId);
  if (!submission) return res.status(404).json({ error: 'Submission not found.' });
  const group = findGroup(submission.groupId);
  if (!group?.memberIds.includes(req.user.id)) return res.status(403).json({ error: 'Only group members can upload documents.' });
  if (submission.detailsLocked) return res.status(409).json({ error: 'Approved project details are locked.' });
  if (!req.files?.length) return res.status(400).json({ error: 'Attach at least one PDF, Word, or PowerPoint file using the documents field.' });
  const documentType = String(req.body?.documentType || 'SUPPORTING_DOCUMENT').toUpperCase();
  const documents = req.files.map((file) => ({ id: `doc-${Date.now()}-${file.filename}`, type: documentType, name: file.originalname, mimeType: file.mimetype, size: file.size, url: `/uploads/${file.filename}`, uploadedAt: new Date().toISOString(), uploadedBy: req.user.id }));
  submission.documents.push(...documents);
  return res.status(201).json({ documents });
});

app.get('/api/reviews', authenticate, allowRoles('FACULTY', 'CC_FACULTY'), (req, res) => {
  const departmentSubmissions = submissions.filter((submission) => submission.department === req.user.department);
  return res.json({ readOnly: req.user.role === 'CC_FACULTY', submissions: departmentSubmissions });
});

app.patch('/api/reviews/:submissionId/approve', authenticate, allowRoles('FACULTY'), (req, res) => {
  const submission = findSubmission(req.params.submissionId);
  if (!submission || submission.department !== req.user.department) return res.status(404).json({ error: 'Submission not found in your department.' });
  if (submission.status === 'APPROVED') return res.status(409).json({ error: 'This submission is already approved.' });
  submission.status = 'APPROVED';
  submission.detailsLocked = true;
  submission.reviewedBy = req.user.id;
  submission.reviewedAt = new Date().toISOString();
  submission.feedback.push({ id: `feedback-${Date.now()}`, type: 'APPROVAL', message: req.body?.comment?.trim() || 'Project approved.', authorId: req.user.id, createdAt: new Date().toISOString() });
  return res.json({ submission });
});

app.patch('/api/reviews/:submissionId/request-revision', authenticate, allowRoles('FACULTY'), (req, res) => {
  const submission = findSubmission(req.params.submissionId);
  const comment = req.body?.comment?.trim();
  if (!submission || submission.department !== req.user.department) return res.status(404).json({ error: 'Submission not found in your department.' });
  if (!comment) return res.status(400).json({ error: 'Revision commentary is required.' });
  submission.status = 'REVISION_REQUESTED';
  submission.detailsLocked = false;
  submission.reviewedBy = req.user.id;
  submission.feedback.push({ id: `feedback-${Date.now()}`, type: 'REVISION_REQUESTED', message: comment, authorId: req.user.id, createdAt: new Date().toISOString() });
  return res.json({ submission });
});

app.get('/api/monitoring/projects', authenticate, allowRoles('CC_FACULTY', 'ADMIN'), (req, res) => {
  const visible = req.user.role === 'ADMIN' ? submissions : submissions.filter((submission) => submission.department === req.user.department);
  return res.json({ projects: visible.map((submission) => ({ id: submission.id, title: submission.project.title, groupId: submission.groupId, status: submission.status, detailsLocked: submission.detailsLocked, submittedAt: submission.submittedAt, documentCount: submission.documents.length })) });
});

app.get('/api/admin/analytics', authenticate, allowRoles('ADMIN'), (_req, res) => {
  const statusCount = (status) => submissions.filter((submission) => submission.status === status).length;
  return res.json({ totals: { projects: submissions.length, groups: groups.length, students: users.filter((user) => user.role === 'STUDENT').length, departments: new Set(users.map((user) => user.department).filter((department) => department !== 'Administration')).size }, workflow: { pending: statusCount('PENDING_REVIEW'), approved: statusCount('APPROVED'), revisions: statusCount('REVISION_REQUESTED') }, projectsByDepartment: Object.entries(submissions.reduce((accumulator, submission) => ({ ...accumulator, [submission.department]: (accumulator[submission.department] || 0) + 1 }), {})).map(([department, count]) => ({ department, count })) });
});

app.get('/api/admin/ai-rules', authenticate, allowRoles('ADMIN'), (_req, res) => res.json({ rules: aiRules }));
app.put('/api/admin/ai-rules', authenticate, allowRoles('ADMIN'), (req, res) => {
  const permitted = ['prioritizeInterdisciplinaryTeams', 'includeSocialImpactScore', 'allowExternalProblemStatements', 'maxRecommendations'];
  const updates = Object.fromEntries(Object.entries(req.body || {}).filter(([key]) => permitted.includes(key)));
  if ('maxRecommendations' in updates && (!Number.isInteger(Number(updates.maxRecommendations)) || Number(updates.maxRecommendations) < 1 || Number(updates.maxRecommendations) > 10)) return res.status(400).json({ error: 'maxRecommendations must be between 1 and 10.' });
  aiRules = { ...aiRules, ...updates, ...(updates.maxRecommendations ? { maxRecommendations: Number(updates.maxRecommendations) } : {}), updatedAt: new Date().toISOString() };
  return res.json({ rules: aiRules });
});

const systemPrompt = `You are an AI project recommendation engine for university students. Generate exactly 3 unique, innovative, socially impactful final-year project ideas. Avoid duplicates and near-duplicates of previously approved projects. Respect the student's group size, preferred technologies, difficulty level, and project domain. Return only a valid JSON array with exactly 3 objects. Each object must contain title, problemStatement, objective, recommendedTechnologies (array), difficultyLevel (Easy, Medium, or Advanced), expectedOutcomes (array), and estimatedTimeline.`;
app.post('/api/recommendations', async (req, res) => {
  const required = ['groupSize', 'preferredTech', 'difficultyLevel', 'projectDomain', 'previouslyApprovedProjects'];
  const missing = required.find((field) => req.body?.[field] === undefined || req.body?.[field] === null);
  if (missing) return res.status(400).json({ error: `Missing required field: ${missing}` });
  if (!hasGroqApiKey) return res.status(503).json({ error: 'Groq API key is missing. Add GROQ_API_KEY to .env and restart the server.' });
  const prompt = `${systemPrompt}\n\nStudent preferences:\n${JSON.stringify(req.body, null, 2)}`;
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GROQ_API_KEY.trim()}` }, body: JSON.stringify({ model: groqModel, messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: prompt }], temperature: 0.8 }) });
    if (!response.ok) return res.status(502).json({ error: `Groq request failed with status ${response.status}. Check the server terminal for details.` });
    const text = (await response.json())?.choices?.[0]?.message?.content?.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const projects = JSON.parse(text);
    if (!Array.isArray(projects) || projects.length !== 3) throw new Error('Expected three projects.');
    return res.json({ projects });
  } catch (error) {
    console.error('Recommendation generation failed:', error.message);
    return res.status(502).json({ error: 'The recommendation response was invalid. Please try again.' });
  }
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) return res.status(400).json({ error: error.message });
  if (error) return res.status(400).json({ error: error.message || 'Request could not be processed.' });
});
app.listen(port, () => console.log(`ProjectPulse API listening on http://localhost:${port}`));
