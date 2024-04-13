// importing required packages and modules
const joi = require(`joi`);

const validateBody = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    const isValid = error == null;

    const errors = {};

    if (!isValid) {
      // let errors = error.details.map((detail) => {
      //   return {
      //     key: detail.context.key,
      //     value: detail.message,
      //   };
      // });

      // console.log(error);

      for (const detail of error.details) {
        errors[detail.context.key] = detail.message;
      }

      return res.status(422).json({ type: "FORM_ERRORS", errors });
      // return res.status(422).json({ type: 'FORM_ERRORS', error });
    }

    // otherwise
    next();
  };
};

const validateParams = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.params, { abortEarly: false });

    const isValid = error == null;

    let errors = {};

    if (!isValid) {
      for (const detail of error.details) {
        errors[detail.context.key] = detail.message;
      }

      return res.status(422).json({ type: "FORM_ERRORS", errors });
    }

    // otherwise
    next();
  };
};

// const validateArrayBody = (schema) => {
//   return async (req, res, next) => {
//     const { error } = schema.validate(req.body.data, { abortEarly: false });

//     const isValid = error == null;

//     let errors = [];

//     if (!isValid) {
//       for (const detail of error.details) {
//         errors[detail.path[0]] = {
//           ...errors[detail.path[0]],
//           [detail.path[1]]: detail.message,
//         };
//       }

//       return res.status(422).json({ type: 'FORM_ERRORS', errors });
//     }
//   };
// };

const validateAddCourcesData = async (req, res, next) => {
  console.log("Yeah! I'm in validateAddCourcesData");
  const { data } = req.body;

  if (!Object.keys(req.body).length) {
    console.log(`Incoming request body can't be empty.`);

    return res.status(400).json({
      type: "ALERT",
      message: `Incoming request body can't be empty.`,
    });
  }

  // defining the schema

  const addCoursesSchema = joi.array().items(
    joi.object().keys({
      _id: joi.string(),
      courseId: joi.string().required(),
      courseTitle: joi.string().required(),
      credits: joi.string().required(),
      grade: joi.string().required(),
      points: joi.string().required(),
      repeated: joi.boolean().required(),
      partOfGpa: joi.boolean().required(),
      addedToGpa: joi.boolean(),
      addedToMGpa: joi.boolean(),
      kuPoints: joi.string(),
      isMajorCourse: joi.boolean(),
      comments: joi.string().allow(null, ""),
    })
  );

  try {
    console.log(data);
    const validationResult = await addCoursesSchema.validateAsync(data, {
      abortEarly: false,
    });

    next();
  } catch (error) {
    let errors = [];
    console.log(error);
    for (const detail of error.details) {
      errors[detail.path[0]] = {
        ...errors[detail.path[0]],
        [detail.path[1]]: detail.message,
      };
    }

    return res.status(422).json({ type: "FORM_ERRORS", errors });
  }
};

module.exports = { validateBody, validateParams, validateAddCourcesData };
