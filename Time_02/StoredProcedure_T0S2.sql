DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `Verificar_Quantidade_Leitos_Disponiveis`(OUT quantidade INT)
BEGIN
	SELECT COUNT(LEI_Disponibilidade) INTO quantidade FROM stagihobd.TBL_LEITO;
END$$
DELIMITER ;

CALL stagihobd.Verificar_Quantidade_Leitos_Disponiveis(@total);
SELECT @total;
