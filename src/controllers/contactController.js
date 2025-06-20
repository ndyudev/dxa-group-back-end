const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Tạo contact form submission
exports.createContact = async (req, res) => {
  try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      company: req.body.company,
      phone: req.body.phone,
      message: req.body.message,
      status: 'new'
    });

    const newContact = await contact.save();

    // Send email notification
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || 'hello@dxagroup.com',
        subject: `New Contact Form Submission - ${contact.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Company:</strong> ${contact.company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${contact.message}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      data: newContact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
};

// Lấy tất cả contact submissions (admin only)
exports.getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || 'all';

    const filter = {};
    if (status !== 'all') {
      filter.status = status;
    }

    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
};

// Cập nhật status của contact
exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact status',
      error: error.message
    });
  }
};

// Xóa contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message
    });
  }
}; 