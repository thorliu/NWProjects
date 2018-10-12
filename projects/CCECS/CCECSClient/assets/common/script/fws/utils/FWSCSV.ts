/*
 * CSV文件解释
 * @Author: 刘强 
 * @Date: 2018-08-03 20:21:11 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-04 17:18:56
 */

module FWSCSV
{
    export const rowSpec: RegExp = /[\r\n]+/;
    export const cellSpec: string = ",";
    export const autoType: boolean = false;

    /** 解释CSV内容 */
    export function parse(csvData: string, header: string[] = null): any[]
    {
        csvData = csvData.replace(/\"/g, "");
        var ret: any[] = [];

        var rows: string[] = csvData.split(rowSpec);

        if (header !== null && header !== undefined)
        {
            rows.splice(0, 0, header.join(cellSpec));
        }
        else
        {
            header = rows[0].split(cellSpec);
        }

        for (var i: number = 1; i < rows.length; i++)
        {
            var rowCell:string = rows[i].replace(/^\s+/g,"").replace(/\s+$/g,"");
            if(rowCell.length === 0) continue;
            var row: string[] = rowCell.split(cellSpec);
            var rowData: any = {};

            for (var j: number = 0; j < row.length; j++)
            {
                var columnName: string = header[j];
                var cell: string = row[j];

                columnName = columnName.replace(/^\s+/g, "").replace(/\s+$/g, "");

                parseCell(cell, rowData, columnName);
            }

            ret.push(rowData);
        }


        return ret;
    }

    function parseCell(cell: string, rowData: any, columnName: string): void
    {
        if (!autoType)
        {
            rowData[columnName] = cell.replace(/\\n/g, "\n");
            return;
        }

        var value: any = null;
        if (/^(true|false)$/i.test(cell))
        {
            value = (cell.toUpperCase() === "TRUE");
        }
        else if (/^\d+$/.test(cell))
        {
            value = parseFloat(cell);
        }
        else if (cell.length === 0)
        {
            value = null;
        }
        else
        {
            value = cell + "";
        }

        rowData[columnName] = value;
    }
}

export = FWSCSV;

window["CSV"] = FWSCSV;


