const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// This is the "Career Journey" sub-document
const ExperienceSchema = new Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date, default: null }, // Null means current
    description: { type: String }
});

const UserSchema = new Schema({
    // 1. Core Identity (From Registration)
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    enrollmentNumber: { type: String, required: true, unique: true }, // Verified by admin
    profilePicture: { type: String, default: 'default_avatar.png' },
    password: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    
    // 2. Academic Details
    graduationYear: { type: Number },
    degree: { type: String }, // e.g., B.Tech, MBA
    major: { type: String },  // e.g., Computer Science
    clubs: [{ type: String }],
    hostel: { type: String },

    // 3. Professional Information
    headline: { type: String }, // "Senior Software Engineer at Google"
    currentRole: { type: String },
    currentCompany: { type: String },
    industry: { type: String },
    city: { type: String },
    country: { type: String },
    careerJourney: [ExperienceSchema], // List of past/current roles
    skills: [{ type: String }], // Tags: "React", "Node.js", "Project Management"

    // 4. The Mentor Status (The Core Feature)
    isMentor: { type: Boolean, default: false }, // The "Open to mentoring" toggle
    mentorshipAreas: [{ type: String }], // Tags: "Career Advice", "Resume Reviews"
    expertise: [{ type: String }], // Tags: "AI/ML", "Product Management"

    // 5. Contact & Links
    linkedinProfile: { type: String },
    githubProfile: { type: String },
    twitterProfile: { type: String },

    // 6. Connections (Your "connectivity" idea)
    connections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    // We can use a virtual property for the count
    
    // --- NEW ADMIN FLAG ---
    isAdmin: { type: Boolean, default: false },

    dateJoined: { type: Date, default: Date.now }
}, {
    timestamps: true // Adds createdAt and updatedAt
});

// Virtual property for "connectivity" count
UserSchema.virtual('connectivity').get(function() {
    return this.connections.length;
});

// Password Hashing Middleware
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);