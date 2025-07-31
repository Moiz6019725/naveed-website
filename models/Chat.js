// /models/Chat.js
const mongoose =require( 'mongoose');

const chatSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  senderType: { type: String, enum: ['user', 'admin'], required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
  receiverType: { type: String, enum: ['user', 'admin'], required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);
module.exports=Chat
