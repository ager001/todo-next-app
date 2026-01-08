// Import the mongoose library to interact with MongoDB
const { default: mongoose } = require('mongoose');

/**
 * Define the Blueprint (Schema) for our Todo
 * This ensures every entry in the database follows the same rules.
 */
const Schema = new mongoose.Schema({
    // The title of the task or service (e.g., "AI & ML Integration")
    title: {
        type: String,
        required: true  // The database will reject the save if this is missing
    },
    // The details of the task
    description: {
        type: String,
        required: true
    },
    // Tracks if the task is finished; defaults to false for new entries
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    // Automatically creates 'createdAt' and 'updatedAt' fields
    // Note: The correct key is 'timestamps' (plural), not 'timeStamp'
    timestamps: true 
});

/**
 * Create or Retrieve the Model.
 * In Next.js, we use 'mongoose.models.todo' first to check if the model
 * already exists. This prevents "Cannot overwrite model" errors during dev.
 */
const TodoModel = mongoose.models.todo || mongoose.model('todo', Schema);

export default TodoModel;