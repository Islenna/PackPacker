#Database Corrections:
    -[] Hex head screwdriver - sizes? Edit database when this information is available.
    -[] Cruciform head screwdriver. 
        >This issue was found during the creation of the 1.5-2.4 Mini set

        SELECT 
    p.id AS pack_id, 
    p.name AS pack_name, 
    i.id AS instrument_id, 
    i.name AS instrument_name, 
    i.description AS instrument_description, 
    pi.quantity AS quantity 
FROM 
    packs p 
JOIN 
    packs_and_instruments pi ON p.id = pi.pack_id 
JOIN 
    instruments i ON pi.instrument_id = i.id 
ORDER BY 
    p.id, i.id
INTO OUTFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\output.csv'
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n';

SELECT 
    proc.id AS procedure_id,
    proc.name AS procedure_name,
    p.id AS pack_id,
    p.name AS pack_name,
    i.id AS instrument_id,
    i.name AS instrument_name,
    pi.quantity AS quantity 
FROM 
    procedures proc
JOIN 
    packs_and_procedures pp ON proc.id = pp.procedure_id
JOIN 
    packs p ON pp.pack_id = p.id
JOIN 
    packs_and_instruments pi ON p.id = pi.pack_id
JOIN 
    instruments i ON pi.instrument_id = i.id
ORDER BY 
    proc.id, p.id, i.id;

    SELECT  -- Nurseview
    proc.id AS procedure_id,
    proc.name AS procedure_name,
    GROUP_CONCAT(DISTINCT p.name ORDER BY p.id SEPARATOR ', ') AS associated_packs,
    GROUP_CONCAT(DISTINCT i.name ORDER BY i.id SEPARATOR ', ') AS associated_instruments
FROM 
    procedures proc
LEFT JOIN 
    packs_and_procedures pp ON proc.id = pp.procedure_id
LEFT JOIN 
    packs p ON pp.pack_id = p.id
LEFT JOIN 
    instruments_and_procedures ip ON proc.id = ip.procedure_id
LEFT JOIN 
    instruments i ON ip.instrument_id = i.id
GROUP BY 
    proc.id
ORDER BY 
    proc.id;

