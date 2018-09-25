import Helper from '../Helpers';


export const getMenu = (req,res) => {
    const sql = 'SELECT * FROM BASE_MENU';
    Helper.executeQuery(sql)
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json({
            message: `operation successful`,
            menu: result.rows
        })
    } )
    .catch((err) => {
        res.statusCode = 404;
        res.setHeader('content-type', 'application/json');
        res.json({
            message: `operation failed`,
            err
        })
    })
}