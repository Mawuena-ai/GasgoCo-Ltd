import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('GasGo Login'),
      ),
      body: Center(
        child: Column(
          children: const [
            // This is where you'll add your login form widgets
            Text('Login to your GasGo account'),
          ],
        ),
      ),
    );
  }
}