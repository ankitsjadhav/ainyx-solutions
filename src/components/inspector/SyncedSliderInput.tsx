import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

interface SyncedSliderInputProps {
    label: string;
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
}

export function SyncedSliderInput({ label, value, min = 0, max = 100, onChange }: SyncedSliderInputProps) {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleSliderChange = (newValues: number[]) => {
        const newValue = newValues[0];
        setLocalValue(newValue);
        onChange(newValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (!isNaN(newValue)) {
            setLocalValue(newValue);
            onChange(newValue);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label>{label}</Label>
                <Input
                    type="number"
                    value={localValue}
                    onChange={handleInputChange}
                    className="w-16 h-8 text-right"
                    min={min}
                    max={max}
                />
            </div>
            <Slider
                value={[localValue]}
                min={min}
                max={max}
                step={1}
                onValueChange={handleSliderChange}
            />
        </div>
    );
}
