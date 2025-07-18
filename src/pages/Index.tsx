import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

type UserRole = 'user' | 'banker' | 'admin';

interface User {
  id: string;
  login: string;
  nickname: string;
  balance: number;
  role: UserRole;
  skinUrl?: string;
}

interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdraw' | 'credit';
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: Date;
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginForm, setLoginForm] = useState({ login: '', password: '' });
  const [showLogin, setShowLogin] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      userId: 'user1',
      type: 'deposit',
      amount: 50,
      status: 'pending',
      timestamp: new Date()
    },
    {
      id: '2',
      userId: 'user2',
      type: 'withdraw',
      amount: 25,
      status: 'pending',
      timestamp: new Date()
    }
  ]);
  
  const [users] = useState<User[]>([
    {
      id: 'admin',
      login: 'Roma_that_ovich',
      nickname: 'Roma_that_ovich',
      balance: 10000,
      role: 'admin'
    },
    {
      id: 'user1',
      login: 'steve_miner',
      nickname: 'SteveMiner',
      balance: 245,
      role: 'user'
    },
    {
      id: 'user2',
      login: 'alex_crafter',
      nickname: 'AlexCrafter',
      balance: 189,
      role: 'user'
    }
  ]);

  const [transactionForm, setTransactionForm] = useState({
    type: 'deposit' as 'deposit' | 'withdraw' | 'credit',
    amount: ''
  });

  const [newUserForm, setNewUserForm] = useState({
    login: '',
    password: '',
    nickname: ''
  });

  const handleLogin = () => {
    if (loginForm.login === 'Roma_that_ovich' && loginForm.password === 'gol228228') {
      setCurrentUser(users.find(u => u.login === 'Roma_that_ovich')!);
      setShowLogin(false);
    } else {
      const user = users.find(u => u.login === loginForm.login);
      if (user) {
        setCurrentUser(user);
        setShowLogin(false);
      }
    }
  };

  const handleTransactionRequest = () => {
    const amount = parseInt(transactionForm.amount);
    if (amount >= 1 && amount <= 1000 && currentUser) {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        userId: currentUser.id,
        type: transactionForm.type,
        amount,
        status: 'pending',
        timestamp: new Date()
      };
      setTransactions([...transactions, newTransaction]);
      setTransactionForm({ type: 'deposit', amount: '' });
    }
  };

  const handleTransactionAction = (transactionId: string, action: 'approve' | 'reject') => {
    setTransactions(transactions.map(t => 
      t.id === transactionId ? { ...t, status: action === 'approve' ? 'approved' : 'rejected' } : t
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit': return 'ArrowUp';
      case 'withdraw': return 'ArrowDown';
      case 'credit': return 'CreditCard';
      default: return 'Diamond';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (showLogin) {
    return (
      <div className="min-h-screen minecraft-bg flex items-center justify-center p-2 sm:p-4">
        <Card className="w-full max-w-md shadow-2xl border-4 border-minecraft-stone mx-2">
          <CardHeader className="text-center bg-minecraft-obsidian text-white p-4 sm:p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src="/img/44917c8e-a08a-45c6-9864-885fbfdbd126.jpg" alt="Diamond" className="w-6 h-6 sm:w-8 sm:h-8" />
              <CardTitle className="text-lg sm:text-2xl font-bold">MINECRAFT BANK</CardTitle>
            </div>
            <p className="text-minecraft-diamond text-sm sm:text-base">Войдите в банковскую систему</p>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Логин</Label>
              <Input
                id="login"
                placeholder="Введите логин"
                value={loginForm.login}
                onChange={(e) => setLoginForm({...loginForm, login: e.target.value})}
                className="border-2 border-minecraft-stone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="border-2 border-minecraft-stone"
              />
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full bg-minecraft-emerald hover:bg-minecraft-grass text-white font-bold py-3"
            >
              <Icon name="LogIn" className="mr-2" />
              Войти
            </Button>
            <Alert>
              <Icon name="Info" className="h-4 w-4" />
              <AlertDescription>
                Админ: Roma_that_ovich / gol228228
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <div className="min-h-screen minecraft-bg p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/img/44917c8e-a08a-45c6-9864-885fbfdbd126.jpg" alt="Diamond" className="w-8 h-8 sm:w-10 sm:h-10" />
            <h1 className="text-xl sm:text-3xl font-bold text-white">MINECRAFT BANK</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Badge variant="outline" className="bg-minecraft-gold text-black font-bold text-xs sm:text-sm">
              {currentUser.role.toUpperCase()}
            </Badge>
            <Button 
              onClick={() => {setShowLogin(true); setCurrentUser(null);}}
              variant="outline"
              size="sm"
              className="border-minecraft-redstone text-minecraft-redstone"
            >
              <Icon name="LogOut" className="mr-1 sm:mr-2 w-4 h-4" />
              <span className="hidden sm:inline">Выйти</span>
              <span className="sm:hidden">Exit</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="bg-minecraft-stone text-white w-full grid grid-cols-1 sm:grid-cols-3 h-auto sm:h-10">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm py-2">Главная</TabsTrigger>
            {(currentUser.role === 'banker' || currentUser.role === 'admin') && (
              <TabsTrigger value="banker" className="text-xs sm:text-sm py-2">Банкир</TabsTrigger>
            )}
            {currentUser.role === 'admin' && (
              <TabsTrigger value="admin" className="text-xs sm:text-sm py-2">Админ</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="border-4 border-minecraft-diamond bg-white/95 col-span-1 md:col-span-2 lg:col-span-1">
                <CardHeader className="bg-minecraft-diamond text-white p-3 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Icon name="User" className="w-4 h-4 sm:w-5 sm:h-5" />
                    Профиль игрока
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4">
                    <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-minecraft-stone">
                      <AvatarImage src={`https://minotar.net/body/${currentUser.nickname}/100.png`} />
                      <AvatarFallback>{currentUser.nickname[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg sm:text-xl font-bold">{currentUser.nickname}</h3>
                      <p className="text-gray-600 text-sm">ID: {currentUser.id}</p>
                    </div>
                  </div>
                  <div className="bg-minecraft-emerald/10 p-3 sm:p-4 rounded-lg border-2 border-minecraft-emerald">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                      <span className="text-base sm:text-lg font-medium">Баланс:</span>
                      <div className="flex items-center gap-2">
                        <img src="/img/44917c8e-a08a-45c6-9864-885fbfdbd126.jpg" alt="Diamond" className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-xl sm:text-2xl font-bold text-minecraft-emerald">{currentUser.balance}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-minecraft-gold bg-white/95">
                <CardHeader className="bg-minecraft-gold text-white p-3 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Icon name="ArrowUpDown" className="w-4 h-4 sm:w-5 sm:h-5" />
                    Операции
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label>Тип операции</Label>
                    <select 
                      value={transactionForm.type}
                      onChange={(e) => setTransactionForm({...transactionForm, type: e.target.value as any})}
                      className="w-full p-2 border border-minecraft-stone rounded"
                    >
                      <option value="deposit">Пополнение</option>
                      <option value="withdraw">Снятие</option>
                      <option value="credit">Кредит</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Количество алмазов (1-1000)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="1000"
                      value={transactionForm.amount}
                      onChange={(e) => setTransactionForm({...transactionForm, amount: e.target.value})}
                      className="border-2 border-minecraft-stone"
                    />
                  </div>
                  <Button 
                    onClick={handleTransactionRequest}
                    className="w-full bg-minecraft-lapis hover:bg-minecraft-diamond text-white py-3 text-sm sm:text-base"
                    disabled={!transactionForm.amount || parseInt(transactionForm.amount) < 1 || parseInt(transactionForm.amount) > 1000}
                  >
                    <Icon name={getTypeIcon(transactionForm.type)} className="mr-1 sm:mr-2 w-4 h-4" />
                    Отправить запрос
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-4 border-minecraft-redstone bg-white/95">
                <CardHeader className="bg-minecraft-redstone text-white p-3 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Icon name="History" className="w-4 h-4 sm:w-5 sm:h-5" />
                    Уведомления
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-6">
                  <div className="space-y-3">
                    {transactions
                      .filter(t => t.userId === currentUser.id)
                      .map(transaction => (
                        <div key={transaction.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded border">
                          <div className="flex items-center gap-2">
                            <Icon name={getTypeIcon(transaction.type)} className="w-4 h-4" />
                            <span className="font-medium text-sm sm:text-base">{transaction.amount} 💎</span>
                          </div>
                          <Badge className={`${getStatusColor(transaction.status)} text-xs`}>
                            {transaction.status}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {(currentUser.role === 'banker' || currentUser.role === 'admin') && (
            <TabsContent value="banker" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="border-4 border-minecraft-emerald bg-white/95">
                  <CardHeader className="bg-minecraft-emerald text-white p-3 sm:p-6">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Icon name="Users" className="w-4 h-4 sm:w-5 sm:h-5" />
                      Список игроков
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6">
                    <div className="space-y-3">
                      {users.map(user => (
                        <div key={user.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded border">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                              <AvatarImage src={`https://minotar.net/avatar/${user.nickname}/24.png`} />
                              <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-sm sm:text-base">{user.nickname}</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <img src="/img/44917c8e-a08a-45c6-9864-885fbfdbd126.jpg" alt="Diamond" className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="font-bold text-sm sm:text-base">{user.balance}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-4 border-minecraft-gold bg-white/95">
                  <CardHeader className="bg-minecraft-gold text-white p-3 sm:p-6">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Icon name="Bell" className="w-4 h-4 sm:w-5 sm:h-5" />
                      Запросы ({transactions.filter(t => t.status === 'pending').length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6">
                    <div className="space-y-3">
                      {transactions
                        .filter(t => t.status === 'pending')
                        .map(transaction => {
                          const user = users.find(u => u.id === transaction.userId);
                          return (
                            <div key={transaction.id} className="p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
                                <div className="flex items-center gap-2">
                                  <Icon name={getTypeIcon(transaction.type)} className="w-4 h-4" />
                                  <span className="font-medium text-sm sm:text-base">{user?.nickname}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <img src="/img/44917c8e-a08a-45c6-9864-885fbfdbd126.jpg" alt="Diamond" className="w-4 h-4" />
                                  <span className="font-bold text-sm sm:text-base">{transaction.amount}</span>
                                </div>
                              </div>
                              <div className="flex gap-2 w-full">
                                <Button
                                  size="sm"
                                  onClick={() => handleTransactionAction(transaction.id, 'approve')}
                                  className="bg-green-500 hover:bg-green-600 text-white flex-1 sm:flex-none"
                                >
                                  <Icon name="Check" className="w-4 h-4" />
                                  <span className="ml-1 sm:hidden">OK</span>
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleTransactionAction(transaction.id, 'reject')}
                                  className="bg-red-500 hover:bg-red-600 text-white flex-1 sm:flex-none"
                                >
                                  <Icon name="X" className="w-4 h-4" />
                                  <span className="ml-1 sm:hidden">NO</span>
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {currentUser.role === 'admin' && (
            <TabsContent value="admin" className="space-y-4 sm:space-y-6">
              <Card className="border-4 border-minecraft-redstone bg-white/95">
                <CardHeader className="bg-minecraft-redstone text-white p-3 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Icon name="UserPlus" className="w-4 h-4 sm:w-5 sm:h-5" />
                    Регистрация пользователя
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label>Логин</Label>
                      <Input
                        value={newUserForm.login}
                        onChange={(e) => setNewUserForm({...newUserForm, login: e.target.value})}
                        className="border-2 border-minecraft-stone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Пароль</Label>
                      <Input
                        type="password"
                        value={newUserForm.password}
                        onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})}
                        className="border-2 border-minecraft-stone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Никнейм в игре</Label>
                      <Input
                        value={newUserForm.nickname}
                        onChange={(e) => setNewUserForm({...newUserForm, nickname: e.target.value})}
                        className="border-2 border-minecraft-stone"
                      />
                    </div>
                  </div>
                  <Button className="mt-3 sm:mt-4 w-full sm:w-auto bg-minecraft-emerald hover:bg-minecraft-grass text-white py-2 sm:py-3">
                    <Icon name="UserPlus" className="mr-1 sm:mr-2 w-4 h-4" />
                    Зарегистрировать
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-4 border-minecraft-lapis bg-white/95">
                <CardHeader className="bg-minecraft-lapis text-white p-3 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Icon name="Settings" className="w-4 h-4 sm:w-5 sm:h-5" />
                    Управление ролями
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-6">
                  <div className="space-y-4">
                    {users.map(user => (
                      <div key={user.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded border gap-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                            <AvatarImage src={`https://minotar.net/avatar/${user.nickname}/40.png`} />
                            <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium block text-sm sm:text-base">{user.nickname}</span>
                            <span className="text-xs sm:text-sm text-gray-500">{user.login}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                          <Badge variant="outline" className="text-xs">{user.role}</Badge>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <select className="p-1 sm:p-2 border border-minecraft-stone rounded text-xs sm:text-sm flex-1 sm:flex-none">
                              <option value="user">User</option>
                              <option value="banker">Banker</option>
                              <option value="admin">Admin</option>
                            </select>
                            <Button size="sm" className="bg-minecraft-gold hover:bg-minecraft-gold/80">
                              <Icon name="Save" className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;