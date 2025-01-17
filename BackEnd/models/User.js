import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  StudentName: {
    type: String,
    required: true,
    trim: true
  },
  StudentEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  StudentPassword: {
    type: String,
    required: true
  },
  StudentRegNo: {
    type: String,
    required: true,
    trim: true
  },
  StudentDEPT: String,
  StudentCGPA: {
    type: String,
    validate: {
      validator: function(v) {
        const cgpa = parseFloat(v);
        return !isNaN(cgpa) && cgpa >= 0 && cgpa <= 10;
      },
      message: props => `${props.value} is not a valid CGPA! Must be between 0 and 10`
    },
    required: true
  },
  StudentSkills: {
    type: String,
    trim: true
  },
  StudentPhone: String,
  StudentAddress: String,
  StudentDOB: String,
  StudentGender: String,
  StudentYear: {
    type: String,
    enum: ["1", "2", "3", "4"]
  },
  StudentSemester: String,
  StudentSection: String,
  StudentBatch: String,
  StudentLinkedIn: String,
  StudentGitHub: String,
  StudentPortfolio: String,
  StudentPlacedInfo: {
    type: Boolean,
    required: true,
    default: false
  },
  StudentCompany: {
    type: String,
    required: function() {
      return this.StudentPlacedInfo === true;
    }
  }
}, {
  timestamps: true
});

// Add validation middleware
UserSchema.pre('save', async function(next) {
  try {
    // Trim whitespace from string fields
    for (let field in this.schema.paths) {
      if (this.schema.paths[field].instance === 'String' && this[field]) {
        this[field] = this[field].trim();
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Add this to debug queries
UserSchema.pre('findOne', function() {
  console.log('Finding student with query:', this.getQuery());
});

const UserPage = mongoose.model("UserPage", UserSchema);
export default UserPage;