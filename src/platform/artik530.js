
/* GPIO definition */
exports.ARTIK_A530_GPIO_GPIO0 = 128;
exports.ARTIK_A530_GPIO_GPIO1 = 129;
exports.ARTIK_A530_GPIO_GPIO2 = 130;
exports.ARTIK_A530_GPIO_GPIO3 = 46;
exports.ARTIK_A530_GPIO_GPIO4 = 14;
exports.ARTIK_A530_GPIO_GPIO5 = 41;
exports.ARTIK_A530_GPIO_GPIO6 = 25;
exports.ARTIK_A530_GPIO_GPIO7 = 0;
exports.ARTIK_A530_GPIO_GPIO8 = 26;
exports.ARTIK_A530_GPIO_GPIO9 = 27;
exports.ARTIK_A530_GPIO_AGPIO0 = 161;

/* SERIAL definition */
exports.ARTIK_A530_SERIAL = { 'UART' : { 'UART4' : 4 } };


/* PWM definition */
exports.ARTIK_A530_PWM = { 'PWMIO' : { 'XPWMIO0' : 2 },
			   'POLR'  : { 'NORMAL' : 0,
				       'INVERT' : 1 }
		       };

/* SPI definition */
exports.ARTIK_A530_SPI = { 'BUS' : { 'BUS0' : 2 },
			   'CS'  : { 'CS0' : 0,
				     'CS1' : 1 },
			   'MODE' : { 'MODE0' : 0,
				      'MODE1' : 1,
				      'MODE2' : 2,
				      'MODE3' : 3,},
			   'BITS' : { 'BITS8' : 8},
			   };
