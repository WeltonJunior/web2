const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require('./db');

const app = express();
const porta = 3030;
app.use(express.json());

const horariosDisponiveis = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

app.post('/Agendamento', [
  check('data').isDate(),
  check('hora').isLength({ min: 1 }),
  check('paciente').isLength({ min: 1 }),
  check('doutor').isLength({ min: 1 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { data, hora, paciente, doutor } = req.body;
  const status = 'marcado';

  if (horariosDisponiveis.includes(time)) {
    db.run('INSERT INTO appointments (date, time, patient, doctor, status) VALUES (?, ?, ?, ?, ?)', [data, hora, paciente, doutor, status], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao agendar a consulta' });
      }
      res.status(201).json({ id: this.lastID });
    });
  } else {
    res.status(400).json({ error: 'Horário não disponível' });
  }
});

app.get('/Agendamento', (req, res) => {
    db.all('SELECT * FROM Agendamento', (err, registros) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar as consultas' });
      }
      res.json(registros);
    });
  });

app.delete('/Agendamento/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM Agendamento WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao cancelar a consulta' });
      }
      res.sendStatus(204).json({ mensagem: 'Tarefa excluída com sucesso' });
    });
});

app.listen(porta, () => {
    console.log(`Servidor rodando em localhost:${porta}`);
});