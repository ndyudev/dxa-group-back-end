const mongoose = require('mongoose');
const User = require('../models/User');
const Service = require('../models/Service');
const AdAccount = require('../models/AdAccount');
const Portfolio = require('../models/Portfolio');
const Contact = require('../models/Contact');

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://chauunhatduyyit:Tk5QoMoRRIeh8LTP@dxagroup.lhzetcz.mongodb.net/?retryWrites=true&w=majority&appName=dxagroup', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedData = async () => {
  try {
    console.log('Starting data seeding...');

    // Clear existing data
    await Service.deleteMany({});
    await Portfolio.deleteMany({});
    await Contact.deleteMany({});

    console.log('Cleared existing data');

    // Tạo admin user
    const adminUser = new User({
      email: 'admin@dxagroup.com',
      password: 'admin123',
      fullName: 'Admin DXA Group',
      role: 'admin',
      company: 'DXA Group'
    });
    await adminUser.save();
    console.log('✅ Đã tạo admin user');

    // Tạo client user
    const clientUser = new User({
      email: 'client@example.com',
      password: 'client123',
      fullName: 'Nguyễn Văn A',
      role: 'client',
      company: 'Công ty ABC',
      phone: '0123456789'
    });
    await clientUser.save();
    console.log('✅ Đã tạo client user');

    // Tạo các dịch vụ marketing
    const servicesData = [
      {
        title: 'Social Media Management',
        description: 'Complete social media management solution for your business',
        icon: '🚀',
        features: [
          'Content Creation & Scheduling',
          'Community Management',
          'Analytics & Reporting',
          'Strategy Development'
        ],
        price: 999,
        duration: 'month',
        category: 'Social Media',
        isActive: true
      },
      {
        title: 'Content Creation',
        description: 'High-quality content that engages your audience',
        icon: '✍️',
        features: [
          'Blog Posts & Articles',
          'Social Media Content',
          'Email Newsletters',
          'Visual Content Design'
        ],
        price: 799,
        duration: 'month',
        category: 'Content Creation',
        isActive: true
      },
      {
        title: 'Digital Advertising',
        description: 'Result-driven advertising campaigns',
        icon: '📈',
        features: [
          'PPC Campaign Management',
          'Social Media Advertising',
          'Display Advertising',
          'Performance Tracking'
        ],
        price: 1499,
        duration: 'month',
        category: 'Digital Advertising',
        isActive: true
      },
      {
        title: 'Brand Strategy',
        description: 'Comprehensive brand development and positioning',
        icon: '🎯',
        features: [
          'Brand Identity Development',
          'Market Research',
          'Competitive Analysis',
          'Brand Guidelines'
        ],
        price: 2499,
        duration: 'project',
        category: 'Brand Strategy',
        isActive: true
      }
    ];

    // Insert services
    const services = await Service.insertMany(servicesData);
    console.log(`Inserted ${services.length} services`);

    // Tạo tài khoản quảng cáo mẫu
    const adAccount = new AdAccount({
      client: clientUser._id,
      platform: 'facebook',
      accountId: 'act_123456789',
      accountName: 'Tài khoản Facebook ABC',
      status: 'active',
      billingInfo: {
        currency: 'VND',
        spendLimit: 10000000,
        currentSpend: 2500000
      },
      accessToken: 'sample_access_token_123'
    });
    await adAccount.save();
    console.log('✅ Đã tạo tài khoản quảng cáo mẫu');

    // Sample portfolio data
    const portfolioData = [
      {
        title: 'TechStart Social Media Campaign',
        description: 'Comprehensive social media management and advertising campaign for a tech startup.',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop',
        category: 'Social Media',
        client: 'TechStart Inc.',
        duration: '6 months',
        technologies: ['Facebook Ads', 'Instagram', 'LinkedIn', 'Google Analytics'],
        results: ['300% increase in engagement', '150% growth in followers', '25% increase in website traffic'],
        featured: true,
        isActive: true,
        order: 1
      },
      {
        title: 'GreenLife Brand Identity',
        description: 'Complete brand identity development and digital presence for an eco-friendly company.',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
        category: 'Brand Strategy',
        client: 'GreenLife Solutions',
        duration: '3 months',
        technologies: ['Brand Strategy', 'Logo Design', 'Website Design', 'Content Creation'],
        results: ['New brand identity launched', 'Website traffic increased by 200%', 'Brand recognition improved'],
        featured: true,
        isActive: true,
        order: 2
      },
      {
        title: 'InnovateCorp Content Marketing',
        description: 'Content marketing strategy and execution for a B2B technology company.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        category: 'Content Creation',
        client: 'InnovateCorp',
        duration: '12 months',
        technologies: ['Blog Writing', 'Email Marketing', 'SEO', 'Social Media'],
        results: ['500+ blog posts published', 'Email list grew by 300%', 'Organic traffic increased by 150%'],
        featured: false,
        isActive: true,
        order: 3
      },
      {
        title: 'Fashion Forward E-commerce',
        description: 'Digital advertising and social media management for a fashion e-commerce brand.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
        category: 'Digital Advertising',
        client: 'Fashion Forward',
        duration: '8 months',
        technologies: ['Google Ads', 'Facebook Ads', 'Instagram Shopping', 'TikTok'],
        results: ['ROAS improved by 250%', 'Sales increased by 180%', 'Customer acquisition cost reduced'],
        featured: false,
        isActive: true,
        order: 4
      },
      {
        title: 'HealthTech Lead Generation',
        description: 'Lead generation campaign for a healthcare technology company.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
        category: 'Digital Advertising',
        client: 'HealthTech Solutions',
        duration: '4 months',
        technologies: ['LinkedIn Ads', 'Content Marketing', 'Email Automation', 'CRM Integration'],
        results: ['500+ qualified leads generated', 'Conversion rate of 15%', 'Revenue increased by 300%'],
        featured: false,
        isActive: true,
        order: 5
      },
      {
        title: 'Restaurant Chain Social Media',
        description: 'Social media management for a multi-location restaurant chain.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
        category: 'Social Media',
        client: 'TasteBuds Restaurant Group',
        duration: '10 months',
        technologies: ['Instagram', 'Facebook', 'TikTok', 'Local SEO'],
        results: ['Social media engagement up 400%', 'Foot traffic increased by 25%', 'Online orders grew by 200%'],
        featured: false,
        isActive: true,
        order: 6
      }
    ];

    // Insert portfolio
    console.log('\n🎉 Hoàn thành tạo dữ liệu mẫu!');
    console.log('\nThông tin đăng nhập:');
    console.log('Admin: admin@dxagroup.com / admin123');
    console.log('Client: client@example.com / client123');

  } catch (error) {
    console.error('❌ Lỗi khi tạo dữ liệu mẫu:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Chạy script
seedData(); 