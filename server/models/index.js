import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;
const roleValues = ['STUDENT', 'FACULTY', 'CC_FACULTY', 'ADMIN'];

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: roleValues, required: true },
  department: { type: String, required: true, trim: true },
}, { timestamps: true });

const studentProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  skills: [{ type: String, trim: true }],
  techInterests: [{ type: String, trim: true }],
  areasOfInterest: [{ type: String, trim: true }],
}, { timestamps: true });

const groupSchema = new Schema({
  name: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  leader: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  minSize: { type: Number, default: 1, min: 1 },
  maxSize: { type: Number, default: 4, min: 1, max: 6 },
  preferredTech: [{ type: String, trim: true }],
  domain: [{ type: String, trim: true }],
  difficultyLevel: { type: String, enum: ['Easy', 'Medium', 'Advanced'], default: 'Medium' },
  selectedProject: { type: Schema.Types.Mixed, default: null },
  status: { type: String, enum: ['FORMING', 'PROJECT_SELECTED', 'LOCKED', 'SUBMITTED'], default: 'FORMING' },
}, { timestamps: true });

const projectSchema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true, unique: true },
  department: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  problemStatement: { type: String, required: true },
  objective: { type: String, required: true },
  technologies: [{ type: String, trim: true }],
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Advanced'], default: 'Medium' },
  expectedOutcomes: [{ type: String }],
  timeline: { type: String, trim: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REVISION_REQUIRED'], default: 'PENDING' },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  detailsLocked: { type: Boolean, default: false },
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const documentSchema = new Schema({
  title: { type: String, required: true, trim: true },
  fileUrl: { type: String, required: true },
  type: { type: String, enum: ['SRS', 'REPORT', 'PPT', 'SUPPORTING_DOCUMENT'], default: 'SUPPORTING_DOCUMENT' },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  mimeType: String,
  size: Number,
}, { timestamps: true });

const reviewSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: { type: String, required: true, trim: true },
  marks: { type: Number, min: 0, max: 100, default: null },
  milestone: { type: String, trim: true, default: 'Proposal' },
  decision: { type: String, enum: ['APPROVED', 'REVISION_REQUIRED'], required: true },
}, { timestamps: true });

const archiveSchema = new Schema({
  title: { type: String, required: true, trim: true, unique: true },
  keywords: [{ type: String, trim: true }],
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', unique: true, sparse: true },
  approvedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const configSchema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

export const User = models.User || model('User', userSchema);
export const StudentProfile = models.StudentProfile || model('StudentProfile', studentProfileSchema);
export const Group = models.Group || model('Group', groupSchema);
export const Project = models.Project || model('Project', projectSchema);
export const Document = models.Document || model('Document', documentSchema);
export const Review = models.Review || model('Review', reviewSchema);
export const ApprovedProjectArchive = models.ApprovedProjectArchive || model('ApprovedProjectArchive', archiveSchema);
export const SystemConfig = models.SystemConfig || model('SystemConfig', configSchema);
export { roleValues };
