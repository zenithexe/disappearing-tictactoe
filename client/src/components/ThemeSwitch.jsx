import React, { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme();
    const [dark, setDark] = useState(false);

    useEffect(()=>{
        if(dark){
            setTheme('dark');
        }
        else{
            setTheme('light');
        }
    }, [dark])

    return (
        <>
            <div className='flex gap-2'>
                <Moon className='dark:text-white' />
                <Switch onClick={()=> setDark(!dark)}> Swtich </Switch>
                <Sun className='dark:text-white'/>
            </div>
        </>
    )
}

export default ThemeSwitch