export const allowedOrigins = ["http://localhost:5173"];
export const corsOptions = {
  origin: (origin, done) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      done(null, true);
    } else {
      done(new Error("Not allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};
