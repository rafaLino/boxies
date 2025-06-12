'use server'
import { UserModel } from '@/db/models'
import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
    const login = formData.get('login')
    const password = formData.get('password')
    if (!login || !password) {
        throw new Error('Login and password are required')
    }
    const user = await UserModel.findOne({ login, password }).exec()

    if (!user) {
        throw new Error('Invalid login or password')
    }

    await createSession(user._id)

    redirect('/')
}