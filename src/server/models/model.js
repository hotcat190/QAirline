import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "./config.model.js";

// Model cho bảng Admin
const Admin = sequelize.define(
  "Admin",
  {
    idAdmin: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING(255), allowNull: true },
    password: { type: DataTypes.STRING(32), allowNull: false },
    username: { type: DataTypes.STRING(16), allowNull: false },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "admin",
    timestamps: false,
  }
);

// Model cho bảng Advertisement
const Advertisement = sequelize.define(
  "Advertisement",
  {
    idAdvertisement: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: { type: DataTypes.TEXT, allowNull: true },
    type: { type: DataTypes.STRING(45), allowNull: true },
    image_url: { type: DataTypes.STRING(100), allowNull: true },
    target_url: { type: DataTypes.STRING(100), allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    idAdmin_created: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "advertisement",
    timestamps: false,
  }
);

// Model cho bảng Airplane
const Airplane = sequelize.define(
  "Airplane",
  {
    idAirplane: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: { type: DataTypes.STRING(45), allowNull: false },
    type: { type: DataTypes.STRING(45), allowNull: false },
    capacity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    status: { type: DataTypes.STRING(45), allowNull: false },
  },
  {
    tableName: "airplane",
    timestamps: false,
  }
);

// Model cho bảng Airport
const Airport = sequelize.define(
  "Airport",
  {
    idairport: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(100), allowNull: true },
    country: { type: DataTypes.STRING(45), allowNull: true },
    city: { type: DataTypes.STRING(45), allowNull: true },
    code: { type: DataTypes.STRING(45), allowNull: true },
  },
  {
    tableName: "airport",
    timestamps: false,
  }
);

// Model cho bảng Flight
const Flight = sequelize.define(
  "Flight",
  {
    idFlight: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    timeStart: { type: DataTypes.DATE, allowNull: true },
    timeEnd: { type: DataTypes.DATE, allowNull: true },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    idbeginAirport: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    idendAirport: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    idAirplane: { type: DataTypes.INTEGER, allowNull: false },
    idAdmin_created: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "flight",
    timestamps: false,
  }
);

// Model cho bảng ClassFlight
const ClassFlight = sequelize.define(
  "ClassFlight",
  {
    idclassFlight: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    class: { type: DataTypes.STRING(45), allowNull: false },
    seatAmount: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    seatBooked: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    currentPrice: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    idFlight: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "classflight",
    timestamps: false,
  }
);

// Model cho bảng Customer
const Customer = sequelize.define(
  "Customer",
  {
    idCustomer: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING(16), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    numberPhone: { type: DataTypes.STRING(11), allowNull: true },
  },
  {
    tableName: "customer",
    timestamps: false,
  }
);

// Model cho bảng Notification
const Notification = sequelize.define(
  "Notification",
  {
    idNotification: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: { type: DataTypes.STRING(500), allowNull: true },
    type: { type: DataTypes.STRING(45), allowNull: true },
    unRead: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    idCustomer: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  },
  {
    tableName: "notification",
    timestamps: false,
  }
);

// Model cho bảng Ticket
const Ticket = sequelize.define(
  "Ticket",
  {
    idTicket: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idClassFlight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "idclassFlight",
    },
    idCustomer: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    price: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "Unpaid",
    },
    code: { type: DataTypes.STRING(45), allowNull: true },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "ticket",
    timestamps: false,
  }
);

// Định nghĩa quan hệ giữa các bảng
Admin.hasMany(Advertisement, { foreignKey: "idAdmin_created" });
Advertisement.belongsTo(Admin, { foreignKey: "idAdmin_created" });

Admin.hasMany(Flight, { foreignKey: "idAdmin_created" });
Flight.belongsTo(Admin, { foreignKey: "idAdmin_created" });

Airport.hasMany(Flight, { foreignKey: "idbeginAirport", as: "beginAirport" });
Airport.hasMany(Flight, { foreignKey: "idendAirport", as: "endAirport" });
Flight.belongsTo(Airport, { foreignKey: "idbeginAirport", as: "beginAirport" });
Flight.belongsTo(Airport, { foreignKey: "idendAirport", as: "endAirport" });

Airplane.hasMany(Flight, { foreignKey: "idAirplane" });
Flight.belongsTo(Airplane, { foreignKey: "idAirplane" });

Flight.hasMany(ClassFlight, { foreignKey: "idFlight" });
ClassFlight.belongsTo(Flight, { foreignKey: "idFlight" });

Customer.hasMany(Notification, { foreignKey: "idCustomer" });
Notification.belongsTo(Customer, { foreignKey: "idCustomer" });

Customer.hasMany(Ticket, { foreignKey: "idCustomer" });
Ticket.belongsTo(Customer, { foreignKey: "idCustomer" });

ClassFlight.hasMany(Ticket, {
  foreignKey: "idClassFlight",
  targetKey: "idclassFlight",
});
Ticket.belongsTo(ClassFlight, {
  foreignKey: "idClassFlight",
  targetKey: "idclassFlight",
});

export {
  Admin,
  Advertisement,
  Airplane,
  Airport,
  Flight,
  ClassFlight,
  Customer,
  Notification,
  Ticket,
};
