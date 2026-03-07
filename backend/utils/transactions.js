import mongoose from "mongoose";

const transactionUnsupported = (error) =>
  /Transaction numbers are only allowed|replica set|mongos/i.test(
    String(error?.message ?? error),
  );

const withOptionalTransaction = async (work) => {
  const session = await mongoose.startSession();
  try {
    let result;
    await session.withTransaction(async () => {
      result = await work(session);
    });
    return result;
  } catch (error) {
    if (transactionUnsupported(error)) {
      return await work(null);
    }
    throw error;
  } finally {
    await session.endSession();
  }
};

export { withOptionalTransaction };
