const validateData = async(data, schema) => {
    try {
      const options = {
        language: {
          key: '{{key}} ',
        },
      };
      return await schema.validate(data, options);
    } catch (error) {
      logger.error(error);
      return error;
    }
};
  
export default validateData;
  