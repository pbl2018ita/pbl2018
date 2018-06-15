CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`%` 
    SQL SECURITY DEFINER
VIEW `stagihobd`.`VW_LEITO_HOSPITAL` AS
    SELECT 
        `LE`.`LEI_Id` AS `LEI_Id`,
        `LE`.`L_Tipo` AS `LEI_Tipo`,
        `LE`.`HOS_Id` AS `HOS_Id`,
        `HO`.`HOS_Name` AS `HOS_Name`,
        `HO`.`HOS_Endereco` AS `HOS_Endereco`
    FROM
        (`stagihobd`.`TBL_LEITO` `LE`
        LEFT JOIN `stagihobd`.`TBL_HOSPITAL` `HO` ON ((`HO`.`HOS_Id` = `LE`.`HOS_Id`)))
