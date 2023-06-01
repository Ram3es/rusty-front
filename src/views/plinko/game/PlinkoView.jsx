import { onMount, createEffect, For  } from "solid-js";
import {  Engine, Render, World, Bodies, Events, Runner, Body} from 'matter-js'

import plinkoBottomSound from "../../../assets/sounds/plinko-bottom.wav"
import Ball from './ball.png';
import Bg from '../../../assets/img/plinko/PlinkoViewBg.png';
import injector from "../../../injector/injector";

const plinkoBottom = new Audio(plinkoBottomSound);

const PlinkoView = (props) => {

    const { socket, userObject } = injector;

    socket.on("plinko:create", (data) => {
        if(data?.data?.path) {
            addPlinko(data.data.path);

            props.betProcessed(data);
        }
    })

    let scene;
    
    const width = 500;
    const height = 500;
    let columns = 3;
    const padding = 133.33333333333334
   
    let forceCache = [];
    let ballCache = {};
    
    const paths = {};

    let rowSettings = {};
    
    const contourSize = 50;

    const engine = Engine.create();
    const { world } = engine;

    const makePlinko = () => {
        const x = Math.round(width / 2);
        const y = -5;
        let r = rowSettings.plinkoSize;
        
        return Bodies.circle(x, y, r, {
            restitution: 0,
            friction: 1,
            mass : .23805846,
            inverseMass : (1 / .23805846),
            collisionFilter: {
            group:-1
            },
            render: {
                // fillStyle:"white"
                sprite: {
                    texture: Ball,
                    xScale: rowSettings.plinkoSize / 9,
                    yScale: rowSettings.plinkoSize / 9
                }
            },
            label: 'plinko',
        });
    };
    const makePeg = (x, y) => {
        let r = rowSettings.pegSize;
        
        return Bodies.circle(x, y, r, {
            isStatic: true,
            friction: 1,
            render: { fillStyle: '#4F5677' },
            label: 'peg',
        });
    };

    const addPlinko = (path) => {
        const plinko = makePlinko();

        // paths[plinko.id] = [
        //     0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        //   ]

        paths[plinko.id] = path;
        World.add(world, plinko);
    }
    
    
    const applyForce = () => {
        for (let ball of forceCache) {
            Body.setVelocity(ball.body, {x: 0, y: 0});
            Body.applyForce(ball.body, ball.body.position, ball.force)
            Body.setStatic(ball.body, false)
        } 
        forceCache = [];
    }
    
    const handleCollision = (event) => {
    const { pairs } = event;
    
        pairs.forEach((pair) => {
            const { bodyA, bodyB } = pair;
            const { label: labelA } = bodyA;
            const { label: labelB } = bodyB;
        
            if(labelA !== labelB) {
                if (labelB === 'plinko') {
        
                    if(!ballCache[bodyB.id]) {
                        ballCache[bodyB.id] = 0;
                    }
                    ballCache[bodyB.id]++;
            
                    
                    const shiftedX = (width / 2 - bodyB.position.x) % (columnSize / 2);

                    Body.translate(bodyB, {
                    x: Math.abs(shiftedX) < (columnSize / 4) ? shiftedX : ((columnSize / 2) + (shiftedX * (shiftedX < 0 ? 1 : -1))), 
                    // y: ((2 - bodyB.position.y)) % (rowSize)
                    y: ((-bodyB.position.y + (16 - (rowSettings.pegSize + rowSettings.plinkoSize))) % (rowSize))
                    })
                    Body.setStatic(bodyB, true)
                    
                    forceCache.push({
                        body: bodyB,
                        force: {
                            x: rowSettings.xForce * (paths[bodyB.id][ballCache[bodyB.id] - 1] == 1 ? 1 : -1),
                            y: rowSettings.yForce
                        },
                    })

                    if (labelA == "bottom" || labelA == "Rectangle Body" || labelA == "leftWall" || labelA == "rightWall") {
                        
                        const rights = paths[bodyB.id].filter((val) => val == 1).length;
                        const i = (rights - (paths[bodyB.id].length - rights)) / 2 + (paths[bodyB.id].length / 2);

                        if(userObject?.user?.sounds) {
                            plinkoBottom.currentTime = 0;
                            plinkoBottom.volume = userObject.user.sounds;
                            plinkoBottom.play()
                        }
                        
                        const multiplierBox = document.getElementById(`mult_${i}`);

                        if (multiplierBox?.style) {
                            multiplierBox.style.transform = "translateY(3px)";
                            multiplierBox.style.filter = "brightness(1.5)";
                            
                            setTimeout(() => {
                                multiplierBox.style.transform = "translateY(0px)";
                                multiplierBox.style.filter = "brightness(1)";
                                
                            }, 200);
                        }

                        World.remove(world, bodyB)
                        delete paths[bodyB.id]
                    
                        return;

                        
                    }

                    
                    
                }
            }
            
        });
    }

    let render;

    let columnSize;
    let rowSize;  
    onMount(() => {
        const ctx = scene; // den är undefined. Fortfarande - scene verkar inte sättas
        render = Render.create({
            element: ctx, // tror vi ska selecta denna på annat sätt - exemeplvis med getContext("2d")
            engine,
            options: {
                wireframes: false,
                background: 'transparent',
                width,
                height 
            },
        });

        Events.on(engine, 'collisionStart', handleCollision);
        Events.on(engine, 'beforeUpdate', applyForce);

        // Runner.isFixed = true;

        const Runners = Runner.create({
            isFixed : true
        })
        // run the engine
        Runner.run(Runners, engine);
        // run the renderer
        Render.run(render);
    })

    createEffect(() => {
        World.clear(world);
        columns = 3;
        forceCache = [];
        ballCache = {};

        columnSize = Math.round((width) / (props.rows() + 2));
        rowSize = (height) / props.rows();

        switch (props.rows()) {
            case 8:
            rowSettings = {
                pegSize: 5,
                plinkoSize: 9,
                yForce: -0.0019 * 1.20,
                xForce: 0.00075 * 1.02,
            }
            break;
            case 10:
            rowSettings = {
                pegSize: 5,
                plinkoSize: 9,
                yForce: -0.0019 * 1.05,
                xForce: 0.00075 * 0.95,
            }
            break;
            case 12:
            rowSettings = {
                pegSize: 4,
                plinkoSize: 8,
                yForce: -0.0019 * 1.05,
                xForce: 0.00075 * 0.84,
            }
            break;
            case 14:
            rowSettings = {
                pegSize: 3.5,
                plinkoSize: 5,
                yForce: -0.0019 * 0.967,
                xForce: 0.00075 * 0.7757,
            }
            break;
            case 16:
            rowSettings = {
                pegSize: 2,
                plinkoSize: 4.5,
                yForce: -0.0019 * 0.95,
                xForce: 0.00075 * 0.7465,
            }
            break;
            default : 
            rowSettings = {
                pegSize: 5,
                plinkoSize: 9,
                yForce: -0.0019,
                xForce: 0.00075,
            }
            break;
        }
        
        
        const contourBottom = Bodies.rectangle(
            width / 2,
            height + contourSize / 2,
            width,
            contourSize,
            {
                isStatic: true,
                label: "bottom",
                render: {
                    fillStyle: 'transparent',
                },
            },
        );
        
        const contourLeft = Bodies.rectangle(0, 0, padding / 2, height * 2, {
            isStatic: true,
            label: "leftWall",
            render: {
                fillStyle: 'transparent',
            },
        });
        const contourRight = Bodies.rectangle(width, 0, padding / 2, height * 2, {
            isStatic: true,
            label: "rightWall",
            render: {
                fillStyle: 'transparent',
            },
        });
        
        const contours = [contourBottom, contourLeft, contourRight];
        
        const grid = Array(props.rows())
        .fill()
        .map((rowItem, row) => {
            const cols = columns;
            
            columns++;
            const dx = -row * (columnSize / 2);
            return Array(cols)
            .fill()
            .map((columnItem, column) => {
                const x = (columnSize * column + dx + (width / 2 - (columnSize)));
                const y = rowSize * row + 16;
                return makePeg(x, y);
            });
        });
        
        const pegs = grid.reduce((acc, curr) => [...acc, ...curr], []);
        World.add(world, [...contours, ...pegs]);
        
        
        
    })

    const multipliers = {
        easy: {
            8: [0.48, 0.96, 1.06, 2.01, 5.37],
            10: [0.48, 0.96, 1.06, 1.34, 2.88, 8.54],
            12: [0.48, 0.96, 1.06, 1.34, 1.54, 2.88, 9.6],
            14: [0.48, 0.96, 1.06, 1.25, 1.34, 1.82, 3.84, 6.81],
            16: [0.48, 0.96, 1.06, 1.15, 1.34, 1.34, 1.92, 8.64, 15.3],
        },
        normal: {
            8: [0.38, 0.67, 1.25, 2.88, 12.5],
            10: [0.38, 0.58, 1.34, 1.92, 4.8, 21.1],
            12: [0.29, 0.58, 1.06, 1.92, 3.84, 10.6, 31.7],
            14: [0.19, 0.48, 0.96, 1.82, 3.84, 6.72, 14.4, 55.6],
            16: [0.29, 0.48, 0.96, 1.44, 2.88, 4.8, 9.6, 39.3, 105.5]
        },
        hard: {
            8: [0.19, 0.29, 1.44, 3.84, 27.8],
            10: [0.19, 0.29, 0.86, 2.88, 9.6, 72.9],
            12: [0.19, 0.19, 0.67, 1.92, 7.77, 23.0, 163.1],
            14: [0.19, 0.19, 0.29, 1.82, 4.8, 17.3, 53.7, 403.0],
            16: [0.19, 0.19, 0.19, 1.92, 3.84, 8.64, 24.9, 124.7, 959.5]
        },
    }


    return ( 
        <>
        <img alt="background" src={Bg} class="absolute z-0" style={{
            "min-width": "110%",
            left: "-5%",
            "min-height": "105%",
            top: "-7%",
        }} />
        <div class="relative z-10" id="canvas-container" ref={scene} />
        <div class={`w-full center gap-1 h-10 -mt-10 relative z-10 ${props.rows() == 12 ? "px-4" : props.rows() >= 14 ? "px-3" : `px-5`}`} style={{
            width: "500px"
        }}>
            {
                <For each={multipliers?.[props.mode()]?.[props.rows()] ? [...multipliers?.[props.mode()]?.[props.rows()].slice(1).reverse() || null, ...multipliers?.[props.mode()]?.[props.rows()] || null] : []}>
                    {(val, i) => (
                        <div class="flex-1 relative center duration-75" id={`mult_${i()}`} style={{
                            color: `${val < 1 ? "#1B2685" : val  < 5 ? "#5517A0" : val < 25 ? "#B53114" : "#9F0F34"}`
                        }}>
                            {
                                val < 1 ? (
                                    <svg class="w-full" viewBox="0 0 43 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M31.5 0L26.5 3L23 0H0V28H10L13.5 25L18.5 28H43V0H31.5Z" fill="url(#paint0_radial_314_124849)"/>
                                        <defs>
                                        <radialGradient id="paint0_radial_314_124849" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21.5003 13.9994) rotate(90) scale(14 21.5)">
                                        <stop stop-color="#7B7DFF"/>
                                        <stop offset="1" stop-color="#2C40EE"/>
                                        </radialGradient>
                                        </defs>
                                    </svg>
                                ) : val < 5 ? (
                                    <svg class="w-full" viewBox="0 0 38 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M31.5 0L26.5 3L23 0H0V28H5L8.5 25L13.5 28H38V0H31.5Z" fill="url(#paint0_radial_314_124846)"/>
                                        <defs>
                                        <radialGradient id="paint0_radial_314_124846" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.9993 13.9994) rotate(90) scale(14 19)">
                                        <stop stop-color="#CF67FF"/>
                                        <stop offset="1" stop-color="#981EEE"/>
                                        </radialGradient>
                                        </defs>
                                    </svg>
                                ) : val < 25 ? (
                                    <svg class="w-full" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M28.5 0L23.5 3L20 0H0V28H5L8.5 25L13.5 28H35V0H28.5Z" fill="url(#paint0_radial_314_124840)"/>
                                        <defs>
                                        <radialGradient id="paint0_radial_314_124840" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17.5 13.9994) rotate(90) scale(14 17.5)">
                                        <stop stop-color="#F79143"/>
                                        <stop offset="1" stop-color="#EA520D"/>
                                        </radialGradient>
                                        </defs>
                                    </svg>

                                ) : (
                                    <svg class="w-full" viewBox="0 0 38 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M26.5 0L21.5 3L18 0H0V28H5L8.3 25L13 28H38V0H26.5Z" fill="url(#paint0_radial_314_124837)"/>
                                        <defs>
                                        <radialGradient id="paint0_radial_314_124837" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.9993 13.9994) rotate(90) scale(14 19)">
                                        <stop stop-color="#F25B5A"/>
                                        <stop offset="1" stop-color="#D6293A"/>
                                        </radialGradient>
                                        </defs>
                                    </svg>
                                )
                            }
                            <p class={`text-current ${props.rows() >= 14 ? "text-10" : `text-${Math.round(24 - props.rows())}`} font-bold font-Oswald absolute`}>{val}</p>
                        </div>
                    )}
                </For>
            }
        </div>
        </>
    );
}

export default PlinkoView;