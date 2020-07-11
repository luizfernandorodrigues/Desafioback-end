export default (mongoose) => {
  const studentSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
      // valida a nota se é menor que zero
      validate(value) {
        if (value < 0) throw new Error('Valor negativo');
      },
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  });

  studentSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;
    return object;
  });

  const studentModel = mongoose.model('student', studentSchema, 'student');

  return studentModel;
};
