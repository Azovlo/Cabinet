'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import { Bold, Italic, Underline, List, ListOrdered, Printer, Signature, FileJson, Image as ImageIcon } from 'lucide-react';


export function DocumentGenerator() {
  const [documentContent, setDocumentContent] = useState(`Банк ПАО АКБ «Металлинвестбанк»
119180, г. Москва,
ул. Большая Полянка, д. 47, стр. 2
ИНН 7709138570
Телефон: 8 (800) 250-97-97

ДАТА: 13.08.2025 01:08:38
БАНКОМАТ № 210520
ОПЕРАЦИЯ № 2182
НОМЕР КАРТЫ: 458443XXXXXXXXXX10
ОПЕРАЦИЯ:`);

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Button variant="outline">Ксива сотрудника МВД</Button>
        <Button variant="outline">Ксива сотрудника банка</Button>
        <Button variant="outline">Документ сотрудника банка</Button>
      </div>

      <Card>
        <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Выберите шаблон документа</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Квитанция" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="receipt">Квитанция</SelectItem>
                            <SelectItem value="agreement">Договор</SelectItem>
                            <SelectItem value="invoice">Счет</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Выберите подпись</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Подпись 1" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sig1">Подпись 1</SelectItem>
                            <SelectItem value="sig2">Подпись 2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>QR код</Label>
                    <Input placeholder='QR код' />
                </div>
                 <div className="space-y-2">
                    <Label>Сохранить как шаблон</Label>
                    <div className="flex gap-2">
                        <Input placeholder="Название нового шаблона" className='flex-grow'/>
                        <Button>Сохранить</Button>
                    </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Выберите банк</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Металлинвест" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="metallinvest">Металлинвест</SelectItem>
                            <SelectItem value="sber">Сбербанк</SelectItem>
                            <SelectItem value="vtb">ВТБ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Цифровая подпись</Label>
                     <Input placeholder='Цифровая подпись' />
                </div>
                 <div className="space-y-2">
                    <Label>Выберите свой шаблон</Label>
                     <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите свой шаблон" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="custom1">Мой шаблон 1</SelectItem>
                            <SelectItem value="custom2">Мой шаблон 2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end pt-8">
                    <Button variant="outline">Предпросмотр</Button>
                </div>
              </div>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
        <Card>
            <CardContent className="p-2">
                <div className="flex items-center gap-2 p-2 border-b">
                    <Button variant="ghost" size="icon"><Bold className="h-4 w-4"/></Button>
                    <Button variant="ghost" size="icon"><Italic className="h-4 w-4"/></Button>
                    <Button variant="ghost" size="icon"><Underline className="h-4 w-4"/></Button>
                    <Button variant="ghost" size="icon"><List className="h-4 w-4"/></Button>
                    <Button variant="ghost" size="icon"><ListOrdered className="h-4 w-4"/></Button>
                    <Input type="text" defaultValue="13.7px" className="w-20 h-8"/>
                </div>
                <Textarea 
                    value={documentContent}
                    onChange={(e) => setDocumentContent(e.target.value)}
                    className="mt-2 h-[400px] bg-white text-black font-mono text-sm border-0 focus:ring-0"
                />
            </CardContent>
        </Card>
        <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full justify-start"><Printer className="mr-2 h-4 w-4"/>Печать</Button>
            <Button variant="outline" className="w-full justify-start"><Signature className="mr-2 h-4 w-4"/>Подпись</Button>
            <Button variant="outline" className="w-full justify-start"><FileJson className="mr-2 h-4 w-4"/>ЭЦП</Button>
            <Button variant="outline" className="w-full justify-start"><ImageIcon className="mr-2 h-4 w-4"/>Изображение</Button>
        </div>
      </div>
    </div>
  );
}
