module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            
            name: String, 
            lastName: String, 
            email: String,
            phone: String,
            userImage: String, // low, medium, high, for example
            type: String, // Uteam, collaborator, admin
            due: Date, // when it's due
            points: Number, //  points
            
           // user: String, // name to be assigned to task
           //description: String,

           // points: Number, //  points
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const user = mongoose.model("user", schema);
    return user;
};