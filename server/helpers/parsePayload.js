module.exports = function parsePayload(payload) {
  return typeof payload === "string" ? JSON.parse(payload) : payload;
}
