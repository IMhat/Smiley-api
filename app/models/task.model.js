module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String, 
            type: String, // next up, in progress, done
            due: String, // when it's due
            priority: String, // low, medium, high, for example
            user: String, // name to be assigned to task
            createdBy: String,
            description: String,
            points: String, // story points
            done: Boolean, // done ? task
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Task = mongoose.model("task", schema);
    return Task;
};