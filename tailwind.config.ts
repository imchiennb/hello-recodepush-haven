
import type { Config } from "tailwindcss";
import scrollbarHide from 'tailwind-scrollbar-hide'

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			},
    			brand: {
    				'50': '#F0F7FF',
    				'100': '#E0EFFF',
    				'200': '#C2DEFF',
    				'300': '#94C7FF',
    				'400': '#4A9FFF',
    				'500': '#1E7BFF',
    				'600': '#0056D2',
    				'700': '#0047B0',
    				'800': '#003B8F',
    				'900': '#002D6D',
    				DEFAULT: 'hsl(var(--brand))',
    				foreground: 'hsl(var(--brand-foreground))'
    			},
    			neutral: {
    				'50': '#F7F7F8',
    				'100': '#EEEEF0',
    				'200': '#DCDCE0',
    				'300': '#B9B9C0',
    				'400': '#8E8E99',
    				'500': '#6E6E78',
    				'600': '#505059',
    				'700': '#3D3D44',
    				'800': '#26262D',
    				'900': '#1A1A1F'
    			},
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			highlight: {
    				DEFAULT: 'hsl(var(--highlight))',
    				foreground: 'hsl(var(--highlight-foreground))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			'fade-in': {
    				from: {
    					opacity: '0'
    				},
    				to: {
    					opacity: '1'
    				}
    			},
    			'fade-up': {
    				from: {
    					opacity: '0',
    					transform: 'translateY(20px)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			'fade-down': {
    				from: {
    					opacity: '0',
    					transform: 'translateY(-20px)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			'scale-in': {
    				from: {
    					opacity: '0',
    					transform: 'scale(0.95)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'scale(1)'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0)'
    				},
    				'50%': {
    					transform: 'translateY(-10px)'
    				}
    			},
    			'pulse-soft': {
    				'0%, 100%': {
    					opacity: '1'
    				},
    				'50%': {
    					opacity: '0.8'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'fade-in': 'fade-in 0.6s ease-out',
    			'fade-up': 'fade-up 0.7s ease-out',
    			'fade-down': 'fade-down 0.7s ease-out',
    			'scale-in': 'scale-in 0.6s ease-out',
    			float: 'float 6s infinite ease-in-out',
    			'pulse-soft': 'pulse-soft 3s infinite ease-in-out'
    		},
    		fontFamily: {
    			sans: [
    				'var(--font-sans)',
    				'ui-sans-serif',
    				'-apple-system',
    				'BlinkMacSystemFont',
    				'Segoe UI Variable Display',
    				'Segoe UI',
    				'Helvetica',
    				'Apple Color Emoji',
    				'Arial',
    				'sans-serif',
    				'Segoe UI Emoji',
    				'Segoe UI Symbol',
    				'Noto Color Emoji'
    			],
    			heading: [
    				'var(--font-heading)',
    				'ui-sans-serif',
    				'-apple-system',
    				'BlinkMacSystemFont',
    				'Segoe UI Variable Display',
    				'Segoe UI',
    				'Helvetica',
    				'Apple Color Emoji',
    				'Arial',
    				'sans-serif',
    				'Segoe UI Emoji',
    				'Segoe UI Symbol',
    				'Noto Color Emoji'
    			],
    			mono: [
    				'var(--font-mono)',
    				...require("tailwindcss/defaultTheme").fontFamily.mono
    			]
    		},
    		boxShadow: {
    			subtle: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
    			elevated: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
    			glass: '0 8px 32px rgba(0, 0, 0, 0.06)'
    		},
    		backgroundImage: {
    			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    			'gradient-hero': 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate"), scrollbarHide],
} satisfies Config;
