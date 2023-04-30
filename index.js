const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ItemController = require('./controller/ItemController.js');
const UserController = require('./controller/UserController.js')

// middleware pour extraire les donnée JSON
app.use(bodyParser.json())

app.get('/items', (req, res) => {
    ItemController.getAllItems((err, items) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).send('Error fetching items from database.');
            return;
        }
        res.send(items);
    });
});


app.post('/addItem', (req,res) => {
    const newItem = req.body;
    ItemController.addItem(newItem,(err,item) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).send('Error adding items from database.');
            return;
        }
        res.send(item);
    });
});

app.delete('/deleteItem',(req,res) => {
    const idItemToDelete = req.body.id;
    ItemController.deleteItem(idItemToDelete,(err,item) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).send('Error deleting items from database.');
            return;
        }
        res.send(item);
    });
})

app.patch('/updateItem/:idItem',(req,res) => {
    const updateItem = req.body;
    const idItem = req.params.idItem;
    ItemController.updateItem(updateItem,idItem,(err,item) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).send('Error deleting items from database.');
            return;
        }
        res.send(item);
    });
})

app.get('/users', (req, res) => {
    UserController.getAllUsers((err, users) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users from database.');
            return;
        }
        res.send(users);
    });
});




app.listen(8080, () => {
    console.log("Server started on port 8080");
})