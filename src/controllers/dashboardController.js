const User = require('../models/User');
const Service = require('../models/Service');
const AdAccount = require('../models/AdAccount');
const Contact = require('../models/Contact');

exports.getDashboardStats = async (req, res) => {
  try {
    const [userCount, serviceCount, adAccountCount, contactCount, newUsers, newContacts] = await Promise.all([
      User.countDocuments(),
      Service.countDocuments(),
      AdAccount.countDocuments(),
      Contact.countDocuments(),
      User.countDocuments({ createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } }),
      Contact.countDocuments({ createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } })
    ]);

    // Thống kê dịch vụ được sử dụng nhiều nhất (theo số lượng adAccount liên quan)
    const topService = await AdAccount.aggregate([
      {
        $lookup: {
          from: 'services',
          localField: 'platform',
          foreignField: 'category',
          as: 'serviceInfo'
        }
      },
      { $unwind: '$serviceInfo' },
      {
        $group: {
          _id: '$serviceInfo.name',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    res.json({
      userCount,
      serviceCount,
      adAccountCount,
      contactCount,
      newUsers,
      newContacts,
      topService: topService[0] || null
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
}; 