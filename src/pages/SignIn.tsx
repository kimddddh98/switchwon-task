import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/routes/path'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type SignInValues = {
  email: string
}

const SignIn = () => {
  const { register, handleSubmit } = useForm<SignInValues>()
  const { login } = useAuth()
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(ROUTES.EXCHANGE, {
        replace: true,
      })
    },
  })
  const onSubmit = (data: SignInValues) => {
    mutate(data.email)
  }

  return (
    <main className="mx-auto flex h-screen w-7xl flex-col justify-center gap-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-center text-5xl font-bold">반갑습니다.</h2>
        <h3 className="text-switchwon-gray-600 text-center text-[32px] font-medium">
          로그인 정보를 입력해주세요.
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-switchwon-gray-0 border-switchwon-gray-300 flex w-[560px] flex-col self-center rounded-[20px] border px-8 py-6"
      >
        <p className="text-switchwon-gray-600 text-xl font-medium">
          이메일 주소를 입력해주세요.
        </p>
        <input
          type="email"
          placeholder="email@example.com"
          {...register('email', {
            required: '이메일을 입력해주세요',
          })}
          className="text-switchwon-gray-600 border-switchwon-gray-700 mt-3 rounded-xl border bg-white p-6 text-xl font-semibold"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-switchwon-cta-1 mt-8 h-[77px] cursor-pointer rounded-2xl text-[22px] font-bold text-white"
        >
          로그인 하기
        </button>
      </form>
    </main>
  )
}

export default SignIn
