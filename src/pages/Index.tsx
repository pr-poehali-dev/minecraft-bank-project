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
      <div className="min-h-screen minecraft-bg flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-4 border-minecraft-stone">
          <CardHeader className="text-center bg-minecraft-obsidian text-white">
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src="/img/44917c8e-a08a-45c6-9864-885fbfdbd126.jpg" alt="Diamond" className="w-8 h-8" />
              <CardTitle className="text-2xl font-bold">MINECRAFT BANK</CardTitle>
            </div>
            <p className="text-minecraft-diamond">Войдите в банковскую систему</p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
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
    <div className="min-h-screen minecraft-bg p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img src="/img/44917c8e-a08a-45c6-9864-885fbfdbd126.jpg" alt="Diamond" className="w-10 h-10" />
            <h1 className="text-3xl font-bold text-white">MINECRAFT BANK</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-minecraft-gold text-black font-bold">
              {currentUser.role.toUpperCase()}
            </Badge>
            <Button 
              onClick={() => {setShowLogin(true); setCurrentUser(null);}}
              variant="outline"
              className="border-minecraft-redstone text-minecraft-redstone"
            >
              <Icon name="LogOut" className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="bg-minecraft-stone text-white">
            <TabsTrigger value="dashboard">Главная</TabsTrigger>
            {(currentUser.role === 'banker' || currentUser.role === 'admin') && (
              <TabsTrigger value="banker">Банкир</TabsTrigger>
            )}
            {currentUser.role === 'admin' && (
              <TabsTrigger value="admin">Администратор</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-4 border-minecraft-diamond bg-white/95">
                <CardHeader className="bg-minecraft-diamond text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" />
                    Профиль игрока
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-minecraft-stone">
                      <AvatarImage src={`https://minotar.net/body/${currentUser.nickname}/100.png`} />
                      <AvatarFallback>{currentUser.nickname[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{currentUser.nickname}</h3>
                      <p className="text-gray-600">ID: {currentUser.id}</p>
                    </div>
                  </div>
                  <div className="bg-minecraft-emerald/10 p-4 rounded-lg border-2 border-minecraft-emerald">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">Баланс:</span>
                      <div className="flex items-center gap-2">
                        <img src="/img/44917c8e-a08a-45c6-9864-885fbfdbd126.jpg" alt="Diamond" className="w-6 h-6" />
                        <span className="text-2xl font-bold text-minecraft-emerald">{currentUser.balance}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-minecraft-gold bg-white/95">
                <CardHeader className="bg-minecraft-gold text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ArrowUpDown" />
                    Операции
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
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
                    className="w-full bg-minecraft-lapis hover:bg-minecraft-diamond text-white"
                    disabled={!transactionForm.amount || parseInt(transactionForm.amount) < 1 || parseInt(transactionForm.amount) > 1000}
                  >
                    <Icon name={getTypeIcon(transactionForm.type)} className="mr-2" />
                    Отправить запрос
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-4 border-minecraft-redstone bg-white/95">
                <CardHeader className="bg-minecraft-redstone text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="History" />
                    Уведомления
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {transactions
                      .filter(t => t.userId === currentUser.id)
                      .map(transaction => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                          <div className="flex items-center gap-2">
                            <Icon name={getTypeIcon(transaction.type)} className="w-4 h-4" />
                            <span className="font-medium">{transaction.amount} 💎</span>
                          </div>
                          <Badge className={getStatusColor(transaction.status)}>
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
            <TabsContent value="banker" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-4 border-minecraft-emerald bg-white/95">
                  <CardHeader className="bg-minecraft-emerald text-white">
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Users" />
                      Список игроков
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {users.map(user => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={`https://minotar.net/avatar/${user.nickname}/24.png`} />
                              <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.nickname}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <img src="/img/44917c8e-a08a-45c6-9864-885fbfdbd126.jpg" alt="Diamond" className="w-4 h-4" />
                            <span className="font-bold">{user.balance}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-4 border-minecraft-gold bg-white/95">
                  <CardHeader className="bg-minecraft-gold text-white">
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Bell" />
                      Запросы ({transactions.filter(t => t.status === 'pending').length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {transactions
                        .filter(t => t.status === 'pending')
                        .map(transaction => {
                          const user = users.find(u => u.id === transaction.userId);
                          return (
                            <div key={transaction.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <Icon name={getTypeIcon(transaction.type)} className="w-4 h-4" />
                                  <span className="font-medium">{user?.nickname}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <img src="/img/44917c8e-a08a-45c6-9864-885fbfdbd126.jpg" alt="Diamond" className="w-4 h-4" />
                                  <span className="font-bold">{transaction.amount}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleTransactionAction(transaction.id, 'approve')}
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                >
                                  <Icon name="Check" className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleTransactionAction(transaction.id, 'reject')}
                                  className="bg-red-500 hover:bg-red-600 text-white"
                                >
                                  <Icon name="X" className="w-4 h-4" />
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
            <TabsContent value="admin" className="space-y-6">
              <Card className="border-4 border-minecraft-redstone bg-white/95">
                <CardHeader className="bg-minecraft-redstone text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="UserPlus" />
                    Регистрация пользователя
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <Button className="mt-4 bg-minecraft-emerald hover:bg-minecraft-grass text-white">
                    <Icon name="UserPlus" className="mr-2" />
                    Зарегистрировать
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-4 border-minecraft-lapis bg-white/95">
                <CardHeader className="bg-minecraft-lapis text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Settings" />
                    Управление ролями
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {users.map(user => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded border">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={`https://minotar.net/avatar/${user.nickname}/40.png`} />
                            <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium block">{user.nickname}</span>
                            <span className="text-sm text-gray-500">{user.login}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{user.role}</Badge>
                          <select className="p-2 border border-minecraft-stone rounded">
                            <option value="user">User</option>
                            <option value="banker">Banker</option>
                            <option value="admin">Admin</option>
                          </select>
                          <Button size="sm" className="bg-minecraft-gold hover:bg-minecraft-gold/80">
                            <Icon name="Save" className="w-4 h-4" />
                          </Button>
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