module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String, 
            type: String, // indumentaria, cursos, gaming
            due: Date, // when it's due
            productImage: String, // low, medium, high, for example
           // user: String, // name to be assigned to task
            description: String,
            points: Number, //  points
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Product = mongoose.model("product", schema);
    return Product;
};