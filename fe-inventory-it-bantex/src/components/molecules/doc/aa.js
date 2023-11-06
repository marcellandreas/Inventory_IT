app.post('/items2', (req, res) => {
   const newItem = req.body; // Data item yang dikirimkan
 
   // Temukan kategori dari item yang baru
   const newItemCategory = newItem.category;
 
   // Temukan kategori yang cocok dalam tabel stock
   db.query('SELECT * FROM stock WHERE category = ?', [newItemCategory], (err, stockResults) => {
     if (err) {
       res.status(500).send('Gagal memeriksa kategori stock.');
       return;
     }
 
     if (stockResults.length > 0) {
       // Jika ada kategori yang cocok dalam tabel stock, tambahkan entri ke tabel detail_stock
       db.query('INSERT INTO detail_stock (item_id, category, ...) VALUES (?, ?, ...)', [newItem.id, newItemCategory, ...], (err, insertResult) => {
         if (err) {
           res.status(500).send('Gagal menambahkan ke detail_stock.');
           return;
         }
 
         // Lakukan tindakan lain yang diperlukan
         res.json('Data berhasil ditambahkan ke detail_stock.');
       });
     } else {
       // Jika tidak ada kategori yang cocok dalam tabel stock, tambahkan ke tabel stock
       db.query('INSERT INTO stock (category, ...) VALUES (?, ...)', [newItemCategory, ...], (err, insertResult) => {
         if (err) {
           res.status(500).send('Gagal menambahkan ke stock.');
           return;
         }
 
         // Lakukan tindakan lain yang diperlukan
         res.json('Data berhasil ditambahkan ke stock.');
       });
     }
     db.query('INSERT INTO items2 (category, ...) VALUES (?, ...)', [newItemCategory, ...], (err, insertResult) => {
      if (err) {
        res.status(500).send('Gagal menambahkan ke items2.');
        return;
      }

      // Lakukan tindakan lain yang diperlukan
      res.json('Data berhasil ditambahkan ke items2.');
    });
   });
 });
 