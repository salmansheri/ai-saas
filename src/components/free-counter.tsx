'use client'; 

import React from 'react'; 
import { Card, CardContent } from './ui/card';
import { MAX_FREE_COUNTS } from '@/constants';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';

interface FreeCounterProps {
    apiLimitCount: number; 
}

const FreeCounter: React.FC<FreeCounterProps> = ({
    apiLimitCount
}) => {
  return (
    <div className="px-3">
        <Card className="bg-white/10 border-0">
            <CardContent className='py-6'>
                <div className="text-center text-sm text-white mb-4 space-y-2">
                    <p>
                        {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
                    </p>

                    <Progress 
                        className="h-3"
                        value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
                    />
                    <Button variant="premium">
                        Upgrade 
                        <Zap className="w-4 h-4 ml-2 fill-white" />

                    </Button>

                </div>

            </CardContent>

        </Card>
    </div>
  )
}

export default FreeCounter