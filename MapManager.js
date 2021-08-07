//For managing largely-static maps. Avoids re-rendering as much as possible.
class MapManager {
    constructor (tileSize = 50, Tiles = {}, Map = [], Events = new EventManager([], -1)) {

        this.Events = Events;
        this.tileSize = tileSize;
        this.Tiles = {};
        this.Map = [];
        this.Renderer = new CanvasRenderer();
        this.Data = [];
        this.changeQueue = [];

        this.loadTiles(Tiles);
        this.loadMap(Map);
    };

    //Loads a set of tile types into memory
    loadTiles (Tiles) {
        for (let key in Tiles) {
            this.Tiles[key] = Tiles[key];
        }
    };

    //Loads a map
    loadMap (Map) {
        this.Data = [];
        this.Map = [];
        this.Renderer.Reset();

        for (let y = 0; y < Map.length; y++)
        {
            this.Map.push([]);
            for (let x = 0; x < Map[y].length; x++)
            {

                let tile = new this.Tiles[Map[y][x].type](this.Events);

                this.Map[y].push({tile});

                if (tile.getImage !== undefined) {
                    this.Renderer.DrawImage(tile.getImage(), {x: x * this.tileSize, y: y * this.tileSize});
                } else {
                    this.Renderer.DrawImageData(tile.getImageData(), {x: x * this.tileSize, y: y * this.tileSize});
                };
                
            }
        }

        this.Data = this.Renderer.GetImageData();
    };

    //Edits a tile
    changeTile (Tile, newTile) {
        this.changeQueue.push(Tile);

        this.Map[Tile.y][Tile.x] = new this.Tiles[newTile](this.Events);
    };

    //Returns the ImageData of the map, also causing any updates to rerender
    getImageData() {

        if (this.changeQueue.length > 0)
        {
            this.Renderer.Reset();
            this.Renderer.DrawImageData(this.Data, {x: 0, y: 0});

            this.changeQueue.forEach(change => {
                this.Renderer.ResetRect(change, {width: this.tileSize, height: this.tileSize});
                let tile = this.Map[change.y][change.x];
                if (tile.getImage !== undefined) {
                    this.Renderer.DrawImage(tile.getImage(), {x: change.x * this.tileSize, y: change.y * this.tileSize});
                } else {
                    this.Renderer.DrawImageData(tile.getImageData(), {x: change.x * this.tileSize, y: change.y * this.tileSize});
                };
            });

            this.Data = this.Renderer.GetImageData();
        };

        return this.Data;

    };

    getTile(x, y) {
        return this.Map[y][x];
    };
}