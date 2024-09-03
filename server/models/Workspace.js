import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Workspace name is required'],
    unique: true, // Ensure workspace names are unique
    trim: true, // Remove leading and trailing spaces
    minlength: [3, 'Workspace name must be at least 3 characters long'], // Validate minimum length
    maxlength: [100, 'Workspace name cannot exceed 100 characters'] // Validate maximum length
  },
  // Add additional fields as needed
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

const Workspace = mongoose.model('Workspace', workspaceSchema);
export default Workspace;

