# Smiley-api

#  REST API, Desarrollada para una app, que gestiona tareas, productos, usuarios y una billetera de puntos.

Desarollada con Node Js, Express, Cors y Mongodb. Bajo el modelo de Vista Controlador.
Por el momento el deploy fue en heroku, para realizar el testeo y consumirla desde la app, luego sera realizado en contenedores docker.



# Puntos de acceso al CRUD Create Read Update and Delete

# Tareas

/api/tasks  Trae las tareas

/api/tasks/todo  Trae las tareas en el estado "TO-DO"

/api/tasks/inprogress  Trae las tareas que esten en el estado "inprogress"

/api/tasks/done  Trae las tareas en el estado "DONE"

/api/tasks/id   Para buscar tareas por id



# productos

/api/products Trae los productos

/api/products/gaming  Trae los productos en la categoria "gaming"

/api/products/indumentaria  Trae los productos en la categoria "indumentaria"

/api/products/cursos  Trae los productos en la categoria "cursos"

/api/product/id   Para buscar productos por id

# Usuarios
 /api/users Trae todos los usuarios

/api/users/collaborator  Trae todos los usuarios en la categoria de "colaboradores"

/api/users/uteam  Trae todos los usuarios en la categoria de "Uteam"

/api/users/admin  Trae todos los usuarios en la categoria "Admin"

/api/users/id  para buscar usuarios por id

/api/users?email=email  para buscar usuarios por email





# Billetera de puntos

/api/points Trae todos los puntos de todos los usuarios

/api/points/id  busca puntos por id

/api/points?email=email   Trae todos los puntos correspondientes al email 



url: https://smiley-appi.herokuapp.com

ejemplo: https://smiley-appi.herokuapp.com/api/tasks



