import mongoose from 'mongoose';

const auditResponseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  // Captures the auditor's check (Pass/Fail/Not Applicable)
  status: {
    type: String,
    enum: ['pass', 'fail', 'na'],
    required: [true, 'A status must be selected for every audited item'],
  },
  // The mandatory/optional reason text provided by the auditor
  reason: {
    type: String,
    trim: true,
    // Production tip: You can validate that a reason is mandatory IF the status is 'fail'
    required: [
      function () {
        return this.status === 'fail';
      },
      'A detailed reason is required if an audit item fails compliance',
    ],
  },
});

const auditSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Audit instance title/name is required'],
      trim: true,
    },
    auditor: {
      type: String, // Replace with mongoose.Schema.Types.ObjectId ref: 'User' when auth is ready
      required: [true, 'Auditor identity is required'],
    },
    status: {
      type: String,
      enum: ['draft', 'submitted'],
      default: 'draft',
    },
    // Array of responses matching the template questions
    responses: [auditResponseSchema],
    
    score: {
      type: Number,
      default: 0, // Calculated percentage or pass rate metric
    },
  },
  {
    timestamps: true,
  }
);

const Audit = mongoose.model('Audit', auditSchema);

export default Audit;