import React, {useEffect, useState} from 'react';
import styles from '@/styles/Home.module.css'

function HexelBoard() {
    interface Pixel {
        color: string;
        flipped: boolean;
    }
    const [counter, setCounter] = useState(0);
    const [pixels, setPixels] = useState<Pixel[]>([]);

    useEffect(() => {
        const base64String = "W1siIzFkMWUyMyIsIiMxZDFlMjIiLCIjMWQxZTIwIiwiIzFmMWUyMyIsIiMxYjFmMjIiLCIjNTAwMDAwIiwiIzUwMDAwMSIsIiMxZTFkMjIiLCIjZjc0MDcwIiwiI2Y4ZDg3MSIsIiMxYzFkMjEiLCIjYWUyNzVmIiwiI2Y4ZjhmOCIsIiNmOGQ5NmYiLCIjZDdhMDM5IiwiI2FmMjg2MCIsIiMxZTFmMjMiLCIjMDAwMDAwIiwiIzAwMDAwMiIsIiM0ZjAwMDAiLCIjMDEwMTAxIiwiI2FlMjg1ZCIsIiNiMDI5NjMiLCIjZjhmYWY5IiwiI2Y5NzA2OCIsIiNmOWY5ZjkiLCIjNTAwMDAzIiwiI2Y4ZDFjMCIsIiNmYTZmNjgiLCIjZjdkMGJmIiwiIzg4NTgxOCIsIiNmN2QxYmUiLCIjZjk3MDY2IiwiI2Y3ZDBjMSIsIiNmOWNmYmYiLCIjODg1ODFhIiwiI2ZhNzE2OSIsIiMxYjFmMjAiLCIjMDAwMTAwIiwiI2Y4NmY2NyIsIiMxZjFlMjQiXSxbMCwxLDEsMSwwLDEsMiwxLDIsMSwzLDEsMSwxLDEsMSwxLDEsNCwxLDUsNSw2LDUsNiwyLDcsMSwxLDcsMSw0LDcsMSwyLDYsOCw4LDksOCw4LDYsNSwxLDEsNywxLDEsMTAsMSw3LDYsMTEsMTIsMTMsMTQsMTUsOCw4LDYsMSw0LDEsMSwxLDE2LDE3LDE3LDE3LDE3LDE3LDE4LDE3LDE1LDE1LDgsMTksMTAsMSw3LDQsMTcsMTcsMTcsMTcsMjAsMTcsMTcsMTcsMTcsMTgsMTUsOCw2LDEsMSwxLDE4LDE3LDE3LDE3LDE3LDE3LDE4LDE3LDE3LDE3LDE3LDIxLDIyLDYsMSwxLDQsMTcsMTcsMTIsMjMsMjQsMjUsMTIsMjQsMTcsMTcsMTUsMTUsMjYsMSw0LDEsMSwxLDEyLDE3LDI3LDE3LDEyLDI4LDI0LDE3LDE3LDI5LDI0LDEsMSwxLDMwLDI5LDEyLDE3LDMxLDIwLDEyLDI5LDI0LDE3LDE3LDI5LDMwLDMyLDE2LDQsMzAsMjksMjksMzMsMjQsMjQsMzQsMjksMTcsMTcsMTcsMjQsMzAsMjQsMSwxLDMwLDI0LDI0LDMyLDI0LDM1LDE3LDI5LDI5LDE3LDMyLDI0LDI0LDEsMSwxNywxNywxNywxNywxNywxNywyMCwxNywxNywyOCwyNCwzNiwxNywxOCwzNywxMCwxLDE3LDE3LDE3LDE3LDE3LDM4LDMxLDI5LDI0LDI0LDE3LDE3LDEsMSwxLDEsMSwzMCwyOCwzOSwyNCwyNCwyNCwyNCwyNCwzMCwxNyw3LDEsMSwxLDQsNDAsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMV1d";
        const decodedArray = decodeArrayFromBase64(base64String);
        const [paletteArray, positionsArray] = parseArrayFromString(decodedArray);

        const positionsArrayConverted = convertArrayToNumbers(positionsArray);
        const colorsArrayStripped = removeQuotes(paletteArray);

        const pixels = positionsArrayConverted.map((value: number) => {
            const pixelColor = colorsArrayStripped[value];
            return { color: pixelColor, flipped: false };
        });

        setPixels(pixels);
    }, []);

    const onPixelMouseEnter = (index: number) => {
        const newPixels = [...pixels];
        newPixels[index].flipped = true;
        setPixels(newPixels);
    };

    const onPixelMouseLeave = (index: number) => {
        const newPixels = [...pixels];
        newPixels[index].flipped = false;
        setPixels(newPixels);
    };

    function parseArrayFromString(decodedArray: string) {
        const subarrays = decodedArray.slice(1, -1).split("],[");
        return subarrays.map((subarray) => {
            const values = subarray.slice(1, -1).split(",");
            return values.map((val) => String(val));
        });
    }

    const decodeArrayFromBase64 = (base64String: string) => {
        return atob(base64String);
    };

    function convertArrayToNumbers(arr: string[]) {
        return arr.map(val => Number(val));
    }

    function removeQuotes(arr: string[]): string[] {
        return arr.map(str => str.replace(/['"]+/g, ''));
    }

    function drawPixel(pixel: Pixel, index: number) {
        return (
            <div
                key={index}
                className={`${styles.pixel} ${pixel.flipped ? styles.flipped : ""}`}
                data-back-color={pixel.color}
                onMouseEnter={() => onPixelMouseEnter(index)}
                onMouseLeave={() => onPixelMouseLeave(index)}
            >
                <div key="back" className={`${styles.back} ${styles.side}`} style={{ backgroundColor: pixel.color }}/>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            {/*<div className="styles.counter">{counter}</div>*/}
            <div className={styles.wrapperInside}>
                {pixels.map((pixel, index) => drawPixel(pixel, index))}
            </div>
        </div>
    );
}

export default HexelBoard;
