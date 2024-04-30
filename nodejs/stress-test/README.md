# Requirements

pm2, apache bench, artillery

# PM2 commands

```bash
pm2 logs
pm2 monit
pm2 kill
pm2 stop
pm2 list
```

# Apache Bench

```bash
ab -n 30000 -c 200 http://localhost:4000/plus
```

# Artillery

```bash
npx artillery run asciiart-load-test.yml
```

# Database

```sql
CREATE TABLE counter (count INTEGER);

INSERT INTO counter (count) VALUES(0);

UPDATE counter SET count = count + 1 RETURNING count;

UPDATE counter SET count = 0;
```

# credentials.json

```json
{
  "database": {
    "host": "localhost",
    "user": "",
    "password": "",
    "database": "postgres",
    "port": 5432,
    "max": 2
  }
}
```
