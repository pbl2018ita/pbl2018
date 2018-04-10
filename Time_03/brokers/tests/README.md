# Testando o broker KAFKA

### Preparando o ambiente:
```sh
$> apt install kafkacat
```

### Subscriber:
```sh
$> kafkacat -C -b stampsnet.hashtagsource.com -t teste 
```

### Publisher:
```sh
$> kafkacat -P -b stampsnet.hashtagsource.com -t teste <enter>
123
```
