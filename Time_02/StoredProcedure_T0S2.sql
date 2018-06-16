DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `Verificar_Quantidade_Leitos_Disponiveis`(OUT quantidade INT)
BEGIN
	select quantidade_leitos
	  INTO quantidade
	  from stagihobd.quantidade_leitos_disponiveis
	  where timestamp = (select max(timestamp) from stagihobd.quantidade_leitos_disponiveis);
END$$
DELIMITER ;

CALL stagihobd.Verificar_Quantidade_Leitos_Disponiveis(@total);
SELECT @total;
