module.exports = async (mongoose) => {
  const con = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });

  console.log(`database is connected to: ${con.connection.host}`);
};
