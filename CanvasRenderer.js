/*

    More elegant and flexible replacement to Processing JS.

*/
export class CanvasRenderer
{

    constructor(Defaults)
    {

        this.defaults = {
            type: "2d",
            size: {
                width: 1000,
                height: 1000
            },
            fill: "#f00000",
            stroke: "#000000",
            shadow: {
                color: "#000000",
                blur: 0,
                x: 0,
                y: 0
            },
            line: {
                cap: "butt",
                join: "miter",
                width: 1,
                miterLimit: 10
            },
            scale: {
                x: 1,
                y: 1
            },
            rotation: 0,
            translation: {
                x: 0,
                y: 0
            },
            skew: {
                x: 0,
                y: 0
            },
            font: "10px sans-serif",
            textAlign: "start",
            textBaseLine: "alphabetic",
            textFill: true,
            maxTextWidth: undefined,
            imageSize: {
                width: undefined,
                height: undefined
            },
            imageClipping: {
                x: undefined,
                y: undefined,
                width: undefined,
                height: undefined
            },
            alpha: 1,
            compositeOperation: "source-over"
        };
        this.settings = {};

        if (Defaults && Defaults.size) this.defaults.size = Defaults.size;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.defaults.size.width;
        this.canvas.height = this.defaults.size.height;
        this.ctx = this.canvas.getContext("2d");

        this.Defaults(Defaults);
        this.Settings(this.defaults);

    };

    Settings(Settings)
    {

        if (Settings === undefined) return this.settings;

        if (Settings.width && this.settings.width !== Settings.width) this.canvas.width = Settings.width;
        if (Settings.height && this.settings.height !== Settings.height) this.canvas.height = Settings.height;



        for (let key in Settings)
        {
            this.settings[key] = Settings[key];
        }

        this.#SetValues(this.settings);

    };

    #SetValues(Settings)
    {
        this.ts = JSON.parse(JSON.stringify(this.settings));

        for (let key in Settings)
        {
            this.ts[key] = Settings[key];
        }

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);

        this.Fill(this.ts.fill, true);
        this.Stroke(this.ts.stroke, true);
        this.Shadow(this.ts.shadow, true);
        this.Line(this.ts.line, true);
        this.Scale(this.ts.scale, true);
        this.Rotation(this.ts.rotation, true);
        this.Skew(this.ts.skew, true);
        this.Font(this.ts.font, true);
        this.TextAlign(this.ts.textAlign, true);
        this.TextBaseLine(this.ts.textBaseLine, true);
        this.Alpha(this.ts.alpha, true);
        this.CompositeOperation(this.ts.compositeOperation, true);
        this.Size(this.ts.size, true);

    };

    Defaults(Settings)
    {

        if (Settings === undefined)
        {
            return this.defaults;
        }

        for (let key in Settings)
        {
            this.defaults[key] = Settings[key];
        }

        this.Settings(this.defaults);
    };

    Size(Settings, i)
    {

        if (Settings === undefined) return this.settings.size;

        if (Settings.width !== this.canvas.width) this.canvas.width = Settings.width;
        if (Settings.height !== this.canvas.height) this.canvas.height = Settings.height;

        if (!i) this.settings.size = Settings;
    };


    Fill(Settings, i)
    {
        if (Settings === undefined)
        {
            return this.settings.fill;
        } else if (typeof (Settings) === "string")
        {
            this.ctx.fillStyle = Settings;
        } else if (Settings.type === undefined || Settings.type === "color")
        {
            this.ctx.fillStyle = Settings.color;
        } else if (Settings.type === "LinearGradient")
        {
            let grad = this.ctx.createLinearGradient(Settings.x1, Settings.y1, Settings.x2, Settings.y2);

            Settings.stops.forEach(stop =>
            {
                grad.addColorStop(stop.offset, stop.color);
            });

            this.ctx.fillStyle = grad;
        } else if (Settings.type === "RadialGradient")
        {
            let grad = this.ctx.createRadialGradient(Settings.x1, Settings.y1, Settings.r1, Settings.x2, Settings.y2, Settings.r2);

            Settings.stops.forEach(stop =>
            {
                grad.addColorStop(stop.offset, stop.color);
            });

            this.ctx.fillStyle = grad;
        } else if (Settings.type === "Pattern")
        {
            let grad = this.ctx.createPattern(Settings.image, Settings.repetition);

            this.ctx.fillStyle = grad;
        }

        if (!i) this.settings.fill = Settings;
    };

    Stroke(Settings, i)
    {
        if (Settings === undefined)
        {
            return this.settings.stroke;
        } else if (typeof (Settings) === "string")
        {
            this.ctx.strokeStyle = Settings;
        } else if (Settings.type === undefined || Settings.type === "color")
        {
            this.ctx.strokeStyle = Settings.color;
        } else if (Settings.type === "LinearGradient")
        {
            let grad = this.ctx.createLinearGradient(Settings.x1, Settings.y1, Settings.x2, Settings.y2);

            Settings.stops.forEach(stop =>
            {
                grad.addColorStop(stop.offset, stop.color);
            });

            this.ctx.strokeStyle = grad;
        } else if (Settings.type === "RadialGradient")
        {
            let grad = this.ctx.createRadialGradient(Settings.x1, Settings.y1, Settings.r1, Settings.x2, Settings.y2, Settings.r2);

            Settings.stops.forEach(stop =>
            {
                grad.addColorStop(stop.offset, stop.color);
            });

            this.ctx.strokeStyle = grad;
        } else if (Settings.type === "Pattern")
        {
            let grad = this.ctx.createPattern(Settings.image, Settings.repetition);

            this.ctx.strokeStyle = grad;
        }

        if (!i) this.settings.stroke = Settings;
    };

    Shadow(Settings, i)
    {

        if (Settings === undefined) return this.settings.shadow;

        for (let key in this.settings.shadow)
        {
            if (Settings[key] === undefined) Settings[key] = this.settings.shadow[key];
        }

        this.ctx.shadowColor = Settings.color;
        this.ctx.shadowBlur = Settings.blur;
        this.ctx.shadowOffsetX = Settings.x;
        this.ctx.shadowOffsetY = Settings.y;

        if (!i) this.settings.shadow = Settings;
    };

    Line(Settings, i)
    {

        if (Settings === undefined) return this.settings.line;

        for (let key in this.settings.line)
        {
            if (Settings[key] === undefined) Settings[key] = this.settings.line[key];
        }

        this.ctx.lineCap = Settings.cap;
        this.ctx.lineJoin = Settings.join;
        this.ctx.lineWidth = Settings.width;
        this.ctx.miterLimit = Settings.miterLimit;

        if (!i) this.settings.line = Settings;
    };

    Scale(Settings, i)
    {

        if (Settings === undefined) return this.settings.scale;

        if (Settings.x === undefined) Settings.x = 1;
        if (Settings.y === undefined) Settings.y = 1;

        this.ctx.scale(Settings.x, Settings.y);

        if (!i)
        {
            this.settings.scale.x *= Settings.x;
            this.settings.scale.y *= Settings.y;
        }
    };

    Rotation(Settings, i)
    {

        if (Settings === undefined) return this.settings.rotation;

        this.ctx.rotate(Settings);

        if (!i) this.settings.rotation = Settings;
    };

    Translation(Settings, i)
    {

        if (Settings === undefined) return this.settings.translation;

        if (Settings.x === undefined) Settings.x = 0;
        if (Settings.y === undefined) Settings.y = 0;

        this.ctx.translate(Settings.x, Settings.y);

        if (!i)
        {
            this.settings.translation.x += Settings.x;
            this.settings.translation.y += Settings.y;
        }
    };

    Skew(Settings, i)
    {

        if (Settings === undefined) return this.settings.skew;

        if (Settings.x === undefined) Settings.x = 0;
        if (Settings.y === undefined) Settings.y = 0;

        this.ctx.transform(1, Settings.x, Settings.y, 1, 0, 0);

        if (!i)
        {
            this.settings.skew.x = Settings.x;
            this.settings.skew.y = Settings.y;
        }
    };

    Font(Settings, i)
    {

        if (Settings === undefined) return this.settings.font;

        this.ctx.font = Settings;

        if (!i) this.settings.font = Settings;
    };

    TextAlign(Settings, i)
    {

        if (Settings === undefined) return this.settings.textAlign;

        this.ctx.textAlign = Settings;

        if (!i) this.settings.textAlign = Settings;
    };

    TextBaseLine(Settings, i)
    {

        if (Settings === undefined) return this.settings.textBaseLine;

        this.ctx.textBaseline = Settings;

        if (!i) this.settings.textBaseLine = Settings;
    };

    TextFill(Settings)
    {

        if (Settings === undefined) return this.settings.textFill;
        this.settings.textFill = Settings;
    };

    MaxTextWidth(Settings)
    {

        if (Settings === undefined) return this.settings.maxTextWidth;
        this.settings.maxTextWidth = Settings;
    };

    ImageSize(Settings)
    {

        if (Settings === undefined) return this.settings.imageSize;

        if (Settings.width !== undefined) this.settings.imageSize.width = Settings.width;
        if (Settings.height !== undefined) this.settings.imageSize.height = Settings.height;

    };

    ImageClipping(Settings)
    {

        if (Settings === undefined) return this.settings.imageClipping;

        if (Settings.x !== undefined) this.settings.imageClipping.x = Settings.x;
        if (Settings.y !== undefined) this.settings.imageClipping.y = Settings.y;
        if (Settings.width !== undefined) this.settings.imageClipping.width = Settings.width;
        if (Settings.height !== undefined) this.settings.imageClipping.height = Settings.height;

    };

    Alpha(Settings, i)
    {

        if (Settings === undefined) return this.settings.alpha;

        this.ctx.globalAlpha = Settings;

        if (!i) this.settings.alpha = Settings;
    };

    CompositeOperation(Settings, i)
    {

        if (Settings === undefined) return this.settings.compositeOperation;

        this.ctx.globalCompositeOperation = Settings;

        if (!i) this.settings.compositeOperation = Settings;
    };

    DrawShape(Positions, Settings)
    {

        this.#SetValues(Settings);

        this.ctx.beginPath();
        if (Positions[0].type === undefined || Positions[0].type === "Point")
        {
            this.ctx.moveTo(Positions[0].x, Positions[0].y);
            Positions.splice(0, 1);
        } else
        {
            this.ctx.moveTo(0, 0);
        }
        Positions.forEach(i =>
        {
            if (i.type === undefined || i.type === "Point")
            {
                this.ctx.lineTo(i.x, i.y)
            } else if (i.type === "QuadraticCurveTo")
            {
                this.ctx.quadraticCurveTo(i.cx, i.cy, i.x, i.y);
            } else if (i.type === "BezierCurveTo")
            {
                this.ctx.bezierCurveTo(i.cx1, i.cy1, i.cx2, i.cy2, i.x, i.y);
            } else if (i.type === "Arc")
            {
                this.ctx.arc(i.x, i.y, i.radius, i.startAngle, i.endAngle, i.antiClockWise);
            } else if (i.type === "ArcTo")
            {
                this.ctx.arcTo(i.cx1, i.cy1, i.x, i.y);
            }
        });
        this.ctx.closePath();

        this.ctx.stroke();
        this.ctx.fill();
    };

    DrawText(Text, Position, Settings)
    {

        this.#SetValues(Settings);

        if (this.ts.textFill)
        {
            this.ctx.fillText(Text, Position.x, Position.y, this.ts.maxTextWidth)
        } else
        {
            this.ctx.strokeText(Text, Position.x, Position.y, this.ts.maxTextWidth)
        }
    };

    DrawImage(Img, Position, Settings)
    {

        this.#SetValues(Settings);

        let c = this.ts.imageClipping
        if (c.x === undefined || c.y === undefined || c.width === undefined || c.height === undefined)
        {
            this.ctx.drawImage(Img, Position.x, Position.y, this.ts.imageSize.width, this.ts.imageSize.height);
        } else
        {
            this.ctx.drawImage(Img, c.x, c.y, c.width, c.height, this.ts.imageSize.width, this.ts.imageSize.height);
        }
    }

    DrawImageData(Data, Position, Settings)
    {

        this.#SetValues(Settings);

        this.ctx.putImageData(Data, Position.x, Position.y);

    }

    Reset()
    {
        this.canvas.width = this.settings.width;
        this.Defaults();
    }

    //Additional functionality

    Collides(Path, Point, fillRule = "nonzero")
    {

        let path = new Path2D();

        path.beginPath();
        if (Path[0].type === undefined || Path[0].type === "Point")
        {
            path.moveTo(Path[0].x, Path[0].y);
            Path.splice(0, 1);
        } else
        {
            path.moveTo(0, 0);
        }
        Path.forEach(i =>
        {
            if (i.type === undefined || i.type === "Point")
            {
                path.lineTo(i.x, i.y)
            } else if (i.type === "QuadraticCurveTo")
            {
                path.quadraticCurveTo(i.cx, i.cy, i.x, i.y);
            } else if (i.type === "BezierCurveTo")
            {
                path.bezierCurveTo(i.cx1, i.cy1, i.cx2, i.cy2, i.x, i.y);
            } else if (i.type === "Arc")
            {
                path.arc(i.x, i.y, i.radius, i.startAngle, i.endAngle, i.antiClockWise);
            } else if (i.type === "ArcTo")
            {
                path.arcTo(i.cx1, i.cy1, i.x, i.y);
            }
        });
        path.closePath();

        //Alternate fillRule: "evenodd"
        return this.ctx.isPointInPath(path, Point.x, Point.y, fillRule)

    }

    MeasureText(Text, Settings)
    {

        this.#SetValues(Settings);

        return this.ctx.measureText(Text);

    }

    CreateImageData(Size)
    {
        return this.ctx.createImageData(Size.width, size.height);
    }

    GetImageData(Position, Size)
    {
        return this.ctx.getImageData(Position.x, Position.y, Size.width, Size.height);
    }

    GetDataURL()
    {
        return this.canvas.toDataURL();
    }

    RandomHSLAColor(input)
    {
        if (hue === undefined)
        {
            hue = Math.round(Math.random() * 255);
        }

        let c = {
            hue: Math.round(Math.random() * 255),
            sat: Math.round(Math.random() * 80) + 20,
            light: Math.round(Math.random() * 80) + 20,
            alpha: (Math.random() * 0.7) + 0.3
        }

        for (key in input)
        {
            c[key] = input[key];
        }

        while (alpha > 1)
        {
            alpha = Math.random() + 0.3;
        }


        return `hsla(${c.hue}deg, ${c.sat}%, ${c.light}%, ${c.alpha})`;
    };

};

//Temp
//var a = new CanvasRenderer();
//document.body.appendChild(a.canvas);