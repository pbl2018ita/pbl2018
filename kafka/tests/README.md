# Testando o broker KAFKA

### Preparando o ambiente:
```sh
$> apt install kafkacat
```

### Subscriber:
```sh
$> kafkacat -C -b stagihobd.hashtagsource.com -t teste 
```

### Publisher:
```sh
$> kafkacat -P -b stagihobd.hashtagsource.com -t teste
```
