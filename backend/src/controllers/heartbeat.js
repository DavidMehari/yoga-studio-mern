export const getSystemStatus = (req, res) => {
  res.status(200).json({
    backendServerRunning: true,
  });
};
