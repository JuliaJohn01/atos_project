import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  workspaceID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Workspace', 
    required: true 
  },
  name: { 
    type: String, 
    required: true, 
    index: true // Indexed for optimized search
  },
  type: { 
    type: String, 
    required: true, 
    index: true // Indexed for optimized search
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  url: { 
    type: String, 
    required: true 
  },
  deletedAt: { 
    type: Date, 
    default: null 
  },
  downloadCount: { 
    type: Number, 
    default: 0 
  },
  metadata: {
    documentName: { 
      type: String 
    },
    type: { 
      type: String 
    },
    owner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    version: { 
      type: String 
    },
    tags: [{ 
      type: String 
    }], // Array of strings for tags
    accessControls: {
      read: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
      }],
      write: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
      }]
    }
  }
}, { timestamps: true }); // Add timestamps to automatically manage createdAt and updatedAt fields

export default mongoose.model('Document', documentSchema);





