module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            
            name: String, 

            email: String,
            phone: String,

            type: String, // Uteam, collaborator, admin

            due: Date, // when it's due
            description: String,
            points: Number, //  points
            
           // user: String, // name to be assigned to task
           //description: String,

            //points: Number, //  points
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Point = mongoose.model("point", schema);
    return Point;
};