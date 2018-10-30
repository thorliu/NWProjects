/*
 * 瓷砖拼接工具类
 * @Author: 刘强 
 * @Date: 2018-09-25 18:32:55 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-30 16:54:11
 */


import FWSTool = require('./FWSTool');


/*
	NOTE:

		    OO		1+2+4+8 = 15
			OO
		-------
			OO		1+2+4 = 7
			O.
		-------
			OO		1+2+8 = 11
			.O
		-------
			O.		1+4+8 = 13
			OO
		-------
			.O		2+4+8 = 14
			OO
		-------
			OO		1+2 = 3
			..
		-------
			..		4+8 = 12
			OO
		-------
			O.		1+4 = 5
			O.
		-------
			.O		2+8 = 10
			.O
		-------
			O.		1+8 = 9
			.O
		-------
			.O		2+4 = 6
			O.
		-------
			O.		1
			..
		-------
			.O		2
			..
		-------
			..		4
			O.
		-------
			..		8
			.O





*/

module TileUtils
{

	/** 地形瓷砖标记 */
	export enum TerrainTileFlags
	{
		None = 0,
		LeftTop = 1 << 0,
		Top = 1 << 1,
		RightTop = 1 << 2,
		Right = 1 << 3,
		RightBottom = 1 << 4,
		Bottom = 1 << 5,
		LeftBottom = 1 << 6,
		Left = 1 << 7,
		Center = 1 << 8
	}

	/** 资砖标识 */
	export enum TerrainTileKeys
	{
		//1
		LeftTop = 1 << 0,
		//2
		RightTop = 1 << 1,
		//4
		LeftBottom = 1 << 2,
		//8
		RightBottom = 1 << 3
	}


	/** 地形瓷砖拼接方法 */
	export class TerrainTilePuzzle
	{
		protected addonTiles: number[];
		protected solidTiles: number[];
		protected rows: number;
		protected cols: number;

		/**
		 * 构造
		 * @param rows 座标系行数
		 * @param cols 座标系列数
		 * @param tile 默认瓷砖
		 */
		constructor(rows: number, cols: number, tile: number = 0)
		{
			this.solidTiles = [];
			this.addonTiles = [];
			this.reset(rows, cols, tile);
		}

		/** 重置数据 */
		public reset(rows: number, cols: number, tile: number = 0): void
		{

			this.solidTiles.length = rows * cols;
			this.addonTiles.length = rows * cols;
			this.rows = rows;
			this.cols = cols;

			for (var i: number = 0; i < this.solidTiles.length; i++)
			{
				this.solidTiles[i] = tile;
				this.addonTiles[i] = tile;
			}
		}

		/** 获取数组索引 */
		public getIndex(x: number, y: number): number
		{
			var ret: number = y * this.cols + x;
			return ret;
		}

		/** 获取实体瓷砖类型 */
		public getSolidTile(x: number, y: number): number
		{
			var i: number = this.getIndex(x, y);
			return this.solidTiles[i];
		}

		/** 设置实体瓷砖类型 */
		public setSolidTile(x: number, y: number, tile: number): void
		{
			var i: number = this.getIndex(x, y);
			this.solidTiles[i] = tile;
		}

		/** 判定瓷砖是否为空 */
		public isEmptyTile(tile: number): boolean
		{
			return (tile === null || tile === undefined || tile === 0);
		}

		//NOTE: 拼接
		protected setAddonTile(x: number, y: number): void
		{
			this.setAddonTileCore(x, y, -1, 0, TerrainTileFlags.Left);
			this.setAddonTileCore(x, y, 1, 0, TerrainTileFlags.Right);
			this.setAddonTileCore(x, y, 0, 1, TerrainTileFlags.Bottom);
			this.setAddonTileCore(x, y, 0, -1, TerrainTileFlags.Top);

			this.setAddonTileCore(x, y, -1, -1, TerrainTileFlags.LeftTop);
			this.setAddonTileCore(x, y, -1, 1, TerrainTileFlags.LeftBottom);
			this.setAddonTileCore(x, y, 1, -1, TerrainTileFlags.RightTop);
			this.setAddonTileCore(x, y, 1, 1, TerrainTileFlags.RightBottom);

			this.setAddonTileCore(x, y, 0, 0, TerrainTileFlags.Center);
		}

		/** 拼接的具体实现 */
		protected setAddonTileCore(
			x: number,
			y: number,
			ox: number,
			oy: number,
			flags: TerrainTileFlags): void
		{

			var cx: number = x + ox;
			var cy: number = y + oy;

			if (cx < 0 || cy < 0) return;
			if (cx >= this.cols || cy >= this.rows) return;

			var i: number = this.getIndex(cx, cy);
			var tile: number = this.solidTiles[i];
			var empty: boolean = this.isEmptyTile(tile);

			i = this.getIndex(x, y);
			tile = this.addonTiles[i];

			if (empty)
			{
				tile = FWSTool.Enum.remove(tile, flags);
			}
			else
			{
				tile = FWSTool.Enum.add(tile, flags);
			}

			this.addonTiles[i] = tile;

			// console.log("TerrainTilePuzzle setAddon", i, x, y, ox, oy, tile);

		}

		/** 获取最终瓷砖数据 */
		public getTiles(): number[][]
		{
			var ret: number[][] = [];

			for (var y: number = 0; y < this.rows; y++)
			{
				for (var x: number = 0; x < this.cols; x++)
				{
					var i: number = this.getIndex(x, y);
					this.setAddonTile(x, y);
				}
			}


			for (var y: number = 0; y < this.rows; y++)
			{
				for (var x: number = 0; x < this.cols; x++)
				{
					this.getTileKey(x, y, ret);
				}
			}
			return ret;
		}

		/** 获取每一大格的瓷砖数据 */
		protected getTileKey(x: number, y: number, ret: number[][]): void
		{
			var i: number = this.getIndex(x, y);
			// var s: number = this.solidTiles[i];
			// if (s !== null && s !== undefined && s !== 0)
			// {
			// 	var f: TerrainTileKeys = TerrainTileKeys.LeftBottom | TerrainTileKeys.LeftTop | TerrainTileKeys.RightBottom | TerrainTileKeys.RightTop;
			// 	ret[i] = [
			// 		f, f, f, f
			// 	];
			// 	return;
			// }


			var a: number = this.addonTiles[i];
			ret[i] = [0, 0, 0, 0];

			/*
				0, 1		oo 	oo
				2, 3		oo 	oo

							oo 	oo
							oo 	oo
			*/


			/*
				LeftTop		Top		RightTop
				Left		+		Right
				LeftBottom	Bottom	RightBottom
			*/


			//NOTE: 下面的逻辑可能有问题

			// console.log("A", x, y, a, getTileFlags(a));
			// debugger

			if (FWSTool.Enum.contain(a, TerrainTileFlags.Center))
			{
				// ret[i][0] = TerrainTileKeys.RightBottom;
				// ret[i][1] = TerrainTileKeys.LeftBottom;
				// ret[i][2] = TerrainTileKeys.RightTop;
				// ret[i][3] = TerrainTileKeys.LeftTop;

				ret[i][0] = 
				ret[i][1] = 
				ret[i][2] = 
				ret[i][3] = TerrainTileKeys.RightBottom
				|  TerrainTileKeys.LeftBottom
				| TerrainTileKeys.RightTop
				| TerrainTileKeys.LeftTop;
			}

			if (FWSTool.Enum.contain(a, TerrainTileFlags.Bottom))
			{
				ret[i][2] = FWSTool.Enum.add(ret[i][2], TerrainTileKeys.RightBottom);
				ret[i][2] = FWSTool.Enum.add(ret[i][2], TerrainTileKeys.LeftBottom);
				ret[i][3] = FWSTool.Enum.add(ret[i][3], TerrainTileKeys.LeftBottom);
				ret[i][3] = FWSTool.Enum.add(ret[i][3], TerrainTileKeys.RightBottom);
			}
			if (FWSTool.Enum.contain(a, TerrainTileFlags.Top))
			{
				ret[i][0] = FWSTool.Enum.add(ret[i][0], TerrainTileKeys.LeftTop);
				ret[i][0] = FWSTool.Enum.add(ret[i][0], TerrainTileKeys.RightTop);
				ret[i][1] = FWSTool.Enum.add(ret[i][1], TerrainTileKeys.LeftTop);
				ret[i][1] = FWSTool.Enum.add(ret[i][1], TerrainTileKeys.RightTop);
			}
			if (FWSTool.Enum.contain(a, TerrainTileFlags.Left))
			{
				ret[i][0] = FWSTool.Enum.add(ret[i][0], TerrainTileKeys.LeftTop);
				ret[i][0] = FWSTool.Enum.add(ret[i][0], TerrainTileKeys.LeftBottom);
				ret[i][2] = FWSTool.Enum.add(ret[i][2], TerrainTileKeys.LeftTop);
				ret[i][2] = FWSTool.Enum.add(ret[i][2], TerrainTileKeys.LeftBottom);
			}
			if (FWSTool.Enum.contain(a, TerrainTileFlags.Right))
			{
				ret[i][1] = FWSTool.Enum.add(ret[i][1], TerrainTileKeys.RightTop);
				ret[i][1] = FWSTool.Enum.add(ret[i][1], TerrainTileKeys.RightBottom);
				ret[i][3] = FWSTool.Enum.add(ret[i][3], TerrainTileKeys.RightTop);
				ret[i][3] = FWSTool.Enum.add(ret[i][3], TerrainTileKeys.RightBottom);
			}

			if (FWSTool.Enum.contain(a, TerrainTileFlags.RightBottom))
			{
				ret[i][3] = FWSTool.Enum.add(ret[i][3], TerrainTileKeys.RightBottom);
			}
			if (FWSTool.Enum.contain(a, TerrainTileFlags.LeftBottom))
			{
				ret[i][2] = FWSTool.Enum.add(ret[i][2], TerrainTileKeys.LeftBottom);
			}
			if (FWSTool.Enum.contain(a, TerrainTileFlags.RightTop))
			{
				ret[i][1] = FWSTool.Enum.add(ret[i][1], TerrainTileKeys.RightTop);
			}
			if (FWSTool.Enum.contain(a, TerrainTileFlags.LeftTop))
			{
				ret[i][0] = FWSTool.Enum.add(ret[i][0], TerrainTileKeys.LeftTop);
			}

		}
	}

	/** 获取调试信息 */
	export function getTileText(n: number, r: number): string
	{
		var ret: string = "";
		if (r === 0)
		{
			if (FWSTool.Enum.contain(n, TerrainTileKeys.LeftTop)) ret += "O"; else ret += ".";
			if (FWSTool.Enum.contain(n, TerrainTileKeys.RightTop)) ret += "O"; else ret += ".";
		}
		else
		{
			if (FWSTool.Enum.contain(n, TerrainTileKeys.LeftBottom)) ret += "O"; else ret += ".";
			if (FWSTool.Enum.contain(n, TerrainTileKeys.RightBottom)) ret += "O"; else ret += ".";
		}

		return ret;
	}

	export function getTileFlags(n: number): string
	{
		var ret: string[] = [];

		if (FWSTool.Enum.contain(n, TerrainTileFlags.LeftTop)) ret.push("LeftTop");
		if (FWSTool.Enum.contain(n, TerrainTileFlags.Top)) ret.push("Top");
		if (FWSTool.Enum.contain(n, TerrainTileFlags.RightTop)) ret.push("RightTop");
		if (FWSTool.Enum.contain(n, TerrainTileFlags.Left)) ret.push("Left");
		if (FWSTool.Enum.contain(n, TerrainTileFlags.Center)) ret.push("Center");
		if (FWSTool.Enum.contain(n, TerrainTileFlags.Right)) ret.push("Right");
		if (FWSTool.Enum.contain(n, TerrainTileFlags.LeftBottom)) ret.push("LeftBottom");
		if (FWSTool.Enum.contain(n, TerrainTileFlags.Bottom)) ret.push("Bottom");
		if (FWSTool.Enum.contain(n, TerrainTileFlags.RightBottom)) ret.push("RightBottom");

		return ret.join("|");
	}
}

export = TileUtils;


//TEST
// if (!CC_EDITOR && !CC_BUILD)
// {
// 	var r: number = 5;
// 	var c: number = 5;
// 	var puzzle: TileUtils.TerrainTilePuzzle = new TileUtils.TerrainTilePuzzle(r, c);

// 	puzzle.setSolidTile(2, 2, 1);
// 	puzzle.setSolidTile(1, 1, 1);
// 	puzzle.setSolidTile(3, 3, 1);
// 	puzzle.setSolidTile(4, 4, 1);
// 	var ret: number[][] = puzzle.getTiles();


// 	var ox: string = " ";
// 	var oy: string = "\n";
// 	var o: string[] = [];
// 	for (var y: number = 0; y < r; y++)
// 	{
// 		for (var i: number = 0; i < 4; i++)
// 		{
// 			var os: string[] = [];
// 			for (var x: number = 0; x < c; x++)
// 			{
// 				var index: number = puzzle.getIndex(x, y);
// 				var ret_cells: number[] = ret[index];

// 				switch (i)
// 				{
// 					case 0:
// 						os.push(TileUtils.getTileText(ret_cells[0], 0));
// 						os.push(TileUtils.getTileText(ret_cells[1], 0));
// 						break;

// 					case 1:
// 						os.push(TileUtils.getTileText(ret_cells[0], 1));
// 						os.push(TileUtils.getTileText(ret_cells[1], 1));
// 						break;

// 					case 2:
// 						os.push(TileUtils.getTileText(ret_cells[2], 0));
// 						os.push(TileUtils.getTileText(ret_cells[3], 0));
// 						break;

// 					case 3:
// 						os.push(TileUtils.getTileText(ret_cells[2], 1));
// 						os.push(TileUtils.getTileText(ret_cells[3], 1));
// 						break;
// 				}

// 			}
// 			o.push(os.join(ox));
// 		}
// 	}

// 	var od: string = o.join(oy);

// 	console.log(od);

// }